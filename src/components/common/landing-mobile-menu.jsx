import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import ConfirmationPopup from "../my-account/confirmationPopup";
import { notifySuccess } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/router";
import { landing_mobile_menu } from "@/data/landing-menu-data";
import { Link as ScrollLink } from "react-scroll";

const LandingMobileMenus = ({ setIsCanvasOpen }) => {
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
        {landing_mobile_menu.map((menu, index) => (
          <ul key={menu.id} aria-label="navbar-list">
            {index === 1 && (
              <>
                <li aria-label="navbar-items">
                  <ScrollLink
                    to={"about"}
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={100}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      borderBottom: "none",
                      color: "black",
                    }}
                    onClick={() => setIsCanvasOpen(false)}
                  >
                    {t("About Us")}
                  </ScrollLink>
                </li>
                <li aria-label="navbar-items">
                  <ScrollLink
                    to={"our-services"}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={100}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      borderBottom: "none",
                      color: "black",
                    }}
                    onClick={() => setIsCanvasOpen(false)}
                  >
                    {t("Our Services")}
                  </ScrollLink>
                </li>
                <li aria-label="navbar-items">
                  <ScrollLink
                    to={"our-files"}
                    spy={true}
                    smooth={true}
                    offset={-130}
                    duration={100}
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      borderBottom: "none",
                      color: "black",
                    }}
                    onClick={() => setIsCanvasOpen(false)}
                  >
                    {t("Our Files")}
                  </ScrollLink>
                </li>
              </>
            )}
            <li key={menu.id} aria-label="navbar-items">
              <Link
                href={menu.link}
                aria-label={menu.title}
                style={{ borderBottom: "none" }}
              >
                {t(menu.title)}
              </Link>
            </li>
            {index === 1 && (
              <li aria-label="navbar-items">
                <ScrollLink
                  to={"get-in-touch"}
                  spy={true}
                  smooth={true}
                  offset={-190}
                  duration={100}
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    borderBottom: "none",
                    color: "black",
                  }}
                  onClick={() => setIsCanvasOpen(false)}
                >
                  {t("Contact Us")}
                </ScrollLink>
              </li>
            )}
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

export default LandingMobileMenus;
