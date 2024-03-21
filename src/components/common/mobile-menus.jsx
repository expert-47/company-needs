import React, { useState } from "react";
import Link from "next/link";
import { mobile_menu } from "@/data/menu-data";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";
import { deleteCookie, getCookie } from "cookies-next";
import ConfirmationPopup from "../my-account/confirmationPopup";
import { notifySuccess } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/router";

const MobileMenus = () => {
  const [showPopup, setShowPopup] = useState(false);
  const t = useTranslations("header");
  const authChecked = useAuthCheck();
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
        {mobile_menu.map((menu) => (
          <ul key={menu.id} aria-label="navbar-list">
            <li key={menu.id} aria-label="navbar-items">
              {!authChecked && [4, 5].includes(menu.id) ? (
                <Link href="/login" aria-label={menu.title}>
                  {t(menu.title)}
                </Link>
              ) : (
                <Link href={menu.link} aria-label={menu.title}>
                  {t(menu.title)}
                </Link>
              )}
            </li>
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

export default MobileMenus;
