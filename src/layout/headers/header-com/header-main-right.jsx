import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartTwo, Menu, User, Wishlist } from "@/svg";
import { openCartMini } from "@/redux/features/cartSlice";
import { deleteCookie, getCookie } from "cookies-next";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";
import { notifySuccess } from "@/utils/toast";
import ConfirmationPopup from "@/components/my-account/confirmationPopup";
import CNImage from "@/components/CNImage";

const HeaderMainRight = ({ setIsCanvasOpen, totalCount }) => {
  const [showPopup, setShowPopup] = useState(false);
  const t = useTranslations("header");
  const { user: userData } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const isToken = getCookie("token");
  const router = useRouter();
  const authChecked = useAuthCheck();
  const handleCartButtonClick = () => {
    if (!authChecked) {
      router.push("/login");
    } else {
      dispatch(openCartMini());
    }
  };
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
    <div className="tp-header-main-right d-flex align-items-center justify-content-end">
      {/* <div className="tp-header-login d-none d-lg-block">
        <div className="d-flex align-items-center">
          {!authChecked ? (
            <div className="">
              <span>
                <Link href="/login" aria-label="UserImage">
                  <User />
                </Link>
              </span>
            </div>
          ) : (
            <div className="tp-header-login-icon">
              {!userData?.profile_image?.url && (
                <span>
                  <Link href="/profile" aria-label="UserImage">
                    <User />
                  </Link>
                </span>
              )}
              {userData?.profile_image?.url && (
                <div>
                  <Link href="/profile" aria-label="UserImage">
                    <CNImage
                      src={userData?.profile_image?.url}
                      alt="product img"
                      width={45}
                      height={45}
                      quality={100}
                      style={{
                        layout: "responsive",
                        objectFit: "contain",
                        borderRadius: "50px",
                      }}
                      className="img-fluid"
                    />
                  </Link>
                </div>
              )}
            </div>
          )}
          <div className="tp-header-login-content d-none d-xl-block pl-10">
            {!userData?.name && <span>{t("Hello")},</span>}
            {userData?.name && (
              <span>
                {t("Hello")},{" "}
                {userData?.name?.length > 10
                  ? userData?.name?.slice(0, 12) + "..."
                  : userData?.name}
              </span>
            )}
            <div className="tp-header-login-title mb-1">
              {userData?.name && (
                <Link href="/profile">{t("Your Account")}</Link>
              )}
            </div>
            <div className="tp-header-login-title">
              {!isToken ? (
                <Link href="/login">{t("Sign In")}</Link>
              ) : (
                <button className="" onClick={handleLogout}>
                  {t("Logout")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div> */}
      <div className="tp-header-action d-flex align-items-center">
        <div className="tp-header-action-item d-none d-lg-block">
          <Link
            href={!authChecked ? "/login" : "/wishlist"}
            className="tp-header-action-btn"
            aria-label="button"
          >
            <Wishlist />
            <span className="tp-header-action-badge">
              {!authChecked ? 0 : wishlist?.length}
            </span>
          </Link>
        </div>
        <div className="tp-header-action-item">
          <button
            onClick={handleCartButtonClick}
            type="button"
            className="tp-header-action-btn cartmini-open-btn"
            aria-label="button"
          >
            <CartTwo />
            <span className="tp-header-action-badge">
              {!authChecked ? 0 : totalCount}
            </span>
          </button>
        </div>
        <div className={router.locale == "ar" ? "" : "tp-header-action-item"}>
          <Link
            href={!authChecked ? "/login" : "/profile"}
            className="tp-header-action-btn"
            aria-label="button"
          >
            <User />
          </Link>
        </div>
        <div className="tp-header-action-item d-lg-none">
          <button
            onClick={() => setIsCanvasOpen(true)}
            type="button"
            className={"tp-header-action-btn tp-offcanvas-open-btn"}
            aria-label="menu-drawer"
          >
            <Menu />
          </button>
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

export default HeaderMainRight;
