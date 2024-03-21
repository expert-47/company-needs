import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CloseTwo } from "@/svg";
import logo from "@assets/img/logo/headerlogo.png";
import MobileCategory from "@/layout/headers/header-com/mobile-category";
import { useTranslations } from "next-intl";
import OurShopMobileMenus from "./ourShop-mobile-menu";
import { useRouter } from "next/router";

const OurShopCanvas = ({ isOffCanvasOpen, setIsCanvasOpen, categories }) => {
  const t = useTranslations("header");
  const route = useRouter();

  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const toggleCategoryDropdown = () => {
    setIsCategoryActive(!isCategoryActive);
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
            {/* {route.pathname !== "/ourshop" && (
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
            )} */}
            <div className="tp-main-menu-mobile fix d-lg-none mb-40">
              <OurShopMobileMenus setIsCanvasOpen={setIsCanvasOpen} />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => setIsCanvasOpen(false)}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
      ></div>
    </>
  );
};

export default OurShopCanvas;
