import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import ConfirmationPopup from "../my-account/confirmationPopup";
import { notifySuccess } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/router";
import { ourShop_mobile_menu } from "@/data/ourshop-menu-data";
import { Link as ScrollLink } from "react-scroll";

const OurShopMobileMenus = ({ setIsCanvasOpen }) => {
  const [showPopup, setShowPopup] = useState(false);
  const t = useTranslations("header");
  const isToken = getCookie("token");
  const dispatch = useDispatch();
  const router = useRouter();
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
    <>
      <nav className="tp-main-menu-content">
        {ourShop_mobile_menu.map((menu, index) => (
          <ul key={menu.id} aria-label="navbar-list">
            <>
              <li key={menu.id} aria-label="navbar-items">
                {menu.title === "Categories" &&
                router.pathname === "/ourshop" ? (
                  <ScrollLink
                    to={"categories"}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={100}
                    style={{ cursor: "pointer", color: "black" }}
                    onClick={() => setIsCanvasOpen(false)}
                  >
                    {t("Categories")}
                  </ScrollLink>
                ) : (
                  <Link href={menu.link} aria-label={t(menu.title)}>
                    {t(menu.title)}
                  </Link>
                )}
              </li>
            </>
          </ul>
        ))}
        <div
          className="tp-header-login-title text-dark pl-25"
          style={{
            padding: "10px 20px 10px 20px",
            fontSize: "16px",
            fontWeight: "normal",
          }}
        >
          {!isToken ? (
            <Link href="/login">{t("LogIn")}</Link>
          ) : (
            <button className="" onClick={handleLogout}>
              {t("Logout")}
            </button>
          )}
        </div>
      </nav>
      {showPopup && (
        <ConfirmationPopup
          isOpen={showPopup}
          message={t("Are you sure you want to logout") + "?"}
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </>
  );
};

export default OurShopMobileMenus;
