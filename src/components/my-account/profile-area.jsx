import React from "react";
import ProfileNavTab from "./profile-nav-tab";
import ProfileShape from "./profile-shape";
import NavProfileTab from "./nav-profile-tab";
import UserProfile from "./profile-info";
import ChangePassword from "./change-password";
import MyOrders from "./my-orders";
import CompanyProfile from "./company-profile";
import useLoadingState from "@/hooks/use-loading";
import SearchPrdLoader from "../loader/search-prd-loader";

const ProfileArea = ({ data, type, orderData }) => {
  const loading = useLoadingState();
  return (
    <>
      {loading ? (
        <div>
          <SearchPrdLoader />
        </div>
      ) : (
        <section className="profile__area pt-50 pb-50">
          <div className="container">
            <div className="profile__inner p-relative">
              <ProfileShape />
              <div className="row">
                <div className="col-xxl-4 col-lg-4 pt-50">
                  <div className="profile__tab mr-40">
                    <ProfileNavTab />
                  </div>
                </div>
                <div className="col-xxl-8 col-lg-8 pt-50">
                  <div className="profile__tab-content">
                    <div className="tab-content" id="profile-tabContent">
                      <div
                        className="tab-pane fade show active "
                        id="nav-profile"
                        role="tabpanel"
                        aria-labelledby="nav-profile-tab"
                      >
                        <NavProfileTab orderData={orderData} />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-information"
                        role="tabpanel"
                        aria-labelledby="nav-information-tab"
                      >
                        {type == "user" ? (
                          <UserProfile data={data} />
                        ) : (
                          <CompanyProfile data={data} />
                        )}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-password"
                        role="tabpanel"
                        aria-labelledby="nav-password-tab"
                      >
                        <ChangePassword />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-order"
                        role="tabpanel"
                        aria-labelledby="nav-order-tab"
                      >
                        <MyOrders orderData={orderData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfileArea;
