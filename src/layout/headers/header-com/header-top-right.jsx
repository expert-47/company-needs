/** @format */

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";
import ConfirmationPopup from "@/components/my-account/confirmationPopup";
import { deleteCookie } from "cookies-next";
import { notifySuccess } from "@/utils/toast";

// language
function Language({ active, handleActive }) {
  const t = useTranslations("header");
  const route = useRouter();
  const authChecked = useAuthCheck();
  return (
    <div className="tp-header-top-menu-item tp-header-lang">
      <span
        onClick={() => handleActive("lang")}
        className="tp-header-lang-toggle"
        id="tp-header-lang-toggle"
      >
        {route.locale == "ar" ? "عربي" : "ENG"}
      </span>
      <ul className={active === "lang" ? "tp-lang-list-open" : ""}>
        {route.locale == "ar" ? (
          <li>
            <a rel="noopener noreferrer" href={`/en${route.asPath}`}>
              English
            </a>
          </li>
        ) : (
          <li>
            <a rel="noopener noreferrer" href={`/ar${route.asPath}`}>
              {t("Arabic")}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}

// currency
// function Currency({ active, handleActive }) {
//   return (
//     <div className="tp-header-top-menu-item tp-header-currency">
//       <span
//         onClick={() => handleActive("currency")}
//         className="tp-header-currency-toggle"
//         id="tp-header-currency-toggle"
//       >
//         USD
//       </span>
//       <ul className={active === "currency" ? "tp-currency-list-open" : ""}>
//         <li>
//           <a rel="noopener noreferrer" href="#">EUR</a>
//         </li>
//         <li>
//           <a rel="noopener noreferrer" href="#">CHF</a>
//         </li>
//         <li>
//           <a rel="noopener noreferrer" href="#">GBP</a>
//         </li>
//         <li>
//           <a rel="noopener noreferrer" href="#">KWD</a>
//         </li>
//       </ul>
//     </div>
//   );
// }

// setting
function ProfileSetting({ active, handleActive }) {
  const t = useTranslations("header");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const authChecked = useAuthCheck();
  const [showPopup, setShowPopup] = useState(false);

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
    <div className="tp-header-top-menu-item tp-header-setting">
      <span
        onClick={() => handleActive("setting")}
        className="tp-header-setting-toggle"
        id="tp-header-setting-toggle"
      >
        {t("Setting")}
      </span>
      <ul className={active === "setting" ? "tp-setting-list-open" : ""}>
        <li>
          <Link href={!authChecked ? "/login" : "/profile"}>
            {t("My Profile")}
          </Link>
        </li>
        <li>
          <Link href={!authChecked ? "/login" : "/wishlist"}>
            {t("Wishlist")}
          </Link>
        </li>
        <li>
          <Link href={!authChecked ? "/login" : "/cart"}>{t("Cart")}</Link>
        </li>
        <li>
          {!user?.name && (
            <Link href="/login" style={{ cursor: "pointer" }}>
              {t("Login")}
            </Link>
          )}
          {user?.name && (
            <a
              rel="noopener noreferrer"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              {t("Logout")}
            </a>
          )}
        </li>
      </ul>
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
}

const HeaderTopRight = () => {
  const [active, setIsActive] = useState("");
  // handle active
  const handleActive = (type) => {
    if (type === active) {
      setIsActive("");
    } else {
      setIsActive(type);
    }
  };
  return (
    <div className="tp-header-top-menu d-flex align-items-center justify-content-end">
      <Language active={active} handleActive={handleActive} />
      {/* <ProfileSetting active={active} handleActive={handleActive} /> */}
    </div>
  );
};

export default HeaderTopRight;
