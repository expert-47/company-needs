import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Box, DeliveryTwo, Processing, Truck } from "@/svg";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { GET_ALL_ORDERS } from "@/graphql/query/orderdetails";
import { useLazyQuery } from "@apollo/client";
import ConfirmationPopup from "./confirmationPopup";
import { notifySuccess } from "@/utils/toast";

const NavProfileTab = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const token = getCookie("token");
  const [Orders, { loading, error, data }] = useLazyQuery(GET_ALL_ORDERS);
  const { user: userData } = useSelector((state) => state.auth);
  const t = useTranslations("header");
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const userCookie = getCookie("userInfo");
    const user = userCookie ? JSON.parse(userCookie) : null;
    setUserInfo(user);
  }, []);
  useEffect(() => {
    if (userInfo?.id) {
      Orders({
        variables: {
          filters: {
            user: {
              id: {
                eq: userInfo.id,
              },
            },
          },
          pagination: {
            limit: 100,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        fetchPolicy: "no-cache",
      });
    }
  }, [userInfo?.id]);

  const orderdata = data?.orders?.data;
  const totalOrders = orderdata?.length;
  const OrderStatus = orderdata?.reduce(
    (counts, item) => {
      const status = item?.attributes?.status;
      if (status === "pending") {
        counts.pending++;
      } else if (status === "processing") {
        counts.processing++;
      } else if (status === "completed" || status === "delivered") {
        counts.completed++;
      } else if (status === "canceled") {
        counts.canceled++;
      } else if (status === "Tracking") {
        counts.Tracking++;
      }
      return counts;
    },
    { pending: 0, processing: 0, completed: 0, canceled: 0, Tracking: 0 }
  );
  const handleLogout = () => {
    setShowPopup(true);
  };
  const confirmLogout = () => {
    dispatch(userLoggedOut());
    router.push("/");
    setShowPopup(false);
    notifySuccess("Logged Out successfully!");
  };
  const cancelLogout = () => {
    setShowPopup(false);
  };
  return (
    <div className="profile__main">
      <div className="profile__main-top pb-80">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="profile__main-inner d-flex flex-wrap align-items-center">
              <div className="profile__main-content">
                <h4 className="profile__main-title">
                  {t("Welcome")} {userData?.name}
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-6 button">
            <div className="profile__main-logout text-sm-end">
              <a
                rel="noopener noreferrer"
                onClick={handleLogout}
                className="tp-logout-btn"
                style={{ cursor: "pointer" }}
              >
                {t("Logout")}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__main-info">
        <div className="row gx-3">
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-download">
                    {totalOrders || 0}
                  </span>
                  <Box />
                </span>
              </div>
              <h4 className="profile__main-info-title">{t("Total Order")}</h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-order">
                    {OrderStatus?.pending || 0}
                  </span>
                  <Processing />
                </span>
              </div>
              <h4 className="profile__main-info-title">{t("Pending Order")}</h4>
            </div>
          </div>

          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-wishlist">
                    {OrderStatus?.processing || 0}
                  </span>
                  <Truck />
                </span>
              </div>
              <h4 className="profile__main-info-title">
                {t("Processing Order")}
              </h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-order">
                    {OrderStatus?.canceled || 0}
                  </span>
                  <Processing />
                </span>
              </div>
              <h4 className="profile__main-info-title">
                {t("Cancelled Order")}
              </h4>
            </div>
          </div>
        </div>
        <div className="row gx-3 mt-md-3">
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-wishlist">
                    {OrderStatus?.Tracking || 0}
                  </span>
                  <DeliveryTwo />
                </span>
              </div>
              <h4 className="profile__main-info-title">
                {t("Tracking Order")}
              </h4>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="profile__main-info-item">
              <div className="profile__main-info-icon">
                <span>
                  <span className="profile-icon-count profile-wishlist">
                    {OrderStatus?.completed || 0}
                  </span>
                  <DeliveryTwo />
                </span>
              </div>
              <h4 className="profile__main-info-title">
                {t("Complete Order")}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <ConfirmationPopup
          isOpen={showPopup}
          message={t("Are you sure you want to logout") + "?"}
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default NavProfileTab;
