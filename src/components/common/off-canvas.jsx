import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// internal
import { CloseTwo } from "@/svg";
import logo from "@assets/img/logo/headerlogo.png";
import contact_img from "@assets/img/icon/contact.png";
import language_img from "@assets/img/icon/language-flag.png";
import MobileCategory from "@/layout/headers/header-com/mobile-category";
import MobileMenus from "./mobile-menus";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

// language
function Language({ active, handleLanguageActive }) {
  const t = useTranslations("header");
  const route = useRouter();
  return (
    <>
      <span
        onClick={() => handleLanguageActive("lang")}
        className="bg-dark px-4 py-2 text-white offcanvas__lang-selected-lang tp-lang-toggle"
        id="tp-offcanvas-lang-toggle"
      >
        {route.locale == "ar" ? "عربي" : "English"}
      </span>
      <ul
        className={`offcanvas__lang-list tp-lang-list py-2 ${
          active === "lang" ? "tp-lang-list-open" : ""
        }`}
      >
        {route.locale == "ar" ? (
          <li>
            <a rel="noopener noreferrer" href={`/en${route.asPath}`}>
              {t("English")}
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
    </>
  );
}

const OffCanvas = ({
  isOffCanvasOpen,
  setIsCanvasOpen,
  categories,
  stopShowingAllCategoriesInHeader,
}) => {
  const t = useTranslations("header");
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isCurrencyActive, setIsCurrencyActive] = useState(false);
  const [isLanguageActive, setIsLanguageActive] = useState(false);
  const [active, setIsActive] = useState("");
  const toggleCategoryDropdown = () => {
    setIsCategoryActive(!isCategoryActive);
  };

  // handle Currency active
  const handleCurrencyActive = () => {
    setIsCurrencyActive(!isCurrencyActive);
    setIsLanguageActive(false);
  };
  // handle Language active
  const handleLanguageActive = (type) => {
    if (type === active) {
      setIsActive("");
    } else {
      setIsActive(type);
    }
  };
  return (
    <>
      <div
        className={`offcanvas__area offcanvas__radius ${
          isOffCanvasOpen ? "offcanvas-opened" : ""
        }`}
      >
        <div className="offcanvas__wrapper">
          <div className="offcanvas__close">
            <button
              onClick={() => setIsCanvasOpen(false)}
              className="offcanvas__close-btn offcanvas-close-btn"
              aria-label="cartmini close"
            >
              <CloseTwo />
            </button>
          </div>
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo logo">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="logo"
                    style={{ height: 45, width: 155 }}
                  />
                </Link>
              </div>
            </div>
            {!stopShowingAllCategoriesInHeader && (
              <div className="offcanvas__category pb-20">
                <button
                  onClick={() => setIsCategoryActive(!isCategoryActive)}
                  className="tp-offcanvas-category-toggle"
                >
                  <i className="fa-solid fa-bars"></i>
                  {t("All Categories")}
                </button>
                <div className="tp-category-mobile-menu">
                  <nav
                    className={`tp-category-menu-content ${
                      isCategoryActive ? "active" : ""
                    }`}
                  >
                    <MobileCategory
                      categoryType={categories}
                      isCategoryActive={isCategoryActive}
                      toggleCategoryDropdown={toggleCategoryDropdown}
                    />
                  </nav>
                </div>
              </div>
            )}
            <div className="tp-main-menu-mobile fix d-lg-none mb-40">
              <MobileMenus />
            </div>
          </div>
          <div className="offcanvas__bottom">
            <div className="offcanvas__footer d-flex align-items-center justify-content-between">
              {/* <div className="offcanvas__currency-wrapper currency">
                <span
                  onClick={handleCurrencyActive}
                  className="offcanvas__currency-selected-currency tp-currency-toggle"
                  id="tp-offcanvas-currency-toggle"
                >
                  Currency : USD
                </span>
                <ul
                  className={`offcanvas__currency-list tp-currency-list ${
                    isCurrencyActive ? "tp-currency-list-open" : ""
                  }`}
                >
                  <li>USD</li>
                  <li>ERU</li>
                  <li>BDT </li>
                  <li>INR</li>
                </ul>
              </div> */}
              <div className="offcanvas__select language">
                <div className="offcanvas__lang">
                  <div className="offcanvas__lang-wrapper">
                    <Language
                      active={active}
                      handleLanguageActive={handleLanguageActive}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* body overlay start */}
      <div
        onClick={() => setIsCanvasOpen(false)}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
      ></div>
      {/* body overlay end */}
    </>
  );
};

export default OffCanvas;
