import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Menus from "./header-com/menus";
import useSticky from "@/hooks/use-sticky";
import logo from "@assets/img/logo/headerlogo.png";
import OffCanvas from "@/components/common/off-canvas";
import { openCartMini } from "@/redux/features/cartSlice";
import HeaderCategory from "./header-com/header-category";
import HeaderTopRight from "./header-com/header-top-right";
import HeaderMainRight from "./header-com/header-main-right";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import HeaderSearchForm from "@/components/forms/header-search-form";
import { CartTwo, CategoryMenu, Menu, Phone, User, Wishlist } from "@/svg";
import { useTranslations } from "next-intl";
import { useCart } from "@/hooks/use-cart";
import useAuthCheck from "@/hooks/use-auth-check";
import OurShopMenus from "./header-com/ourShopMenu";
import OurShopCanvas from "@/components/common/ourShop-off-canvas";
import { useRouter } from "next/router";
import TwitterIcon from "@assets/img/icon/twitter";
import LandingTopHeaderContact from "./header-com/landing-header-contact";
import facebook from "../../../public/assets/img/top-header-social-icons/facebook.png";
import instagram from "../../../public/assets/img/top-header-social-icons/instagram.png";
import linkdin from "../../../public/assets/img/top-header-social-icons/linkdin.png";
import whatsapp from "../../../public/assets/img/top-header-social-icons/whatsapp.png";
import twitter from "../../../public/assets/img/top-header-social-icons/x.png";

const Header = ({
  categories,
  stopShowingAllCategoriesInHeader,
  socialLinks,
} = props) => {
  const route = useRouter();
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const { totalCount, totalPrice } = useCart();
  const authChecked = useAuthCheck();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  const t = useTranslations("header");
  const toggleCategoryDropdown = () => {
    setIsCategoryActive(!isCategoryActive);
  };
  return (
    <>
      <header>
        <div className="tp-header-area p-relative z-index-11">
          <div className="tp-header-top  p-relative z-index-1 d-none d-md-block landingTopHeader">
            <div className="ml-20 mr-20">
              <div className="row align-items-center">
                <div
                  className={
                    "col-md-4 d-flex" +
                    (route.locale == "ar" ? " justify-content-center " : "")
                  }
                >
                  <div
                    className={
                      "tp-footer-social topHeaderSocialIcons" +
                      (route.locale == "ar" ? " justify-content-center" : "")
                    }
                    style={{
                      marginLeft: route.locale == "ar" ? "60px" : "",
                    }}
                  >
                    {socialLinks?.attributes?.facebookUrl && (
                      <Link
                        href={socialLinks?.attributes?.facebookUrl}
                        target="_blank"
                        aria-label="Facebook"
                      >
                        <Image
                          src={facebook}
                          alt="facebook"
                          style={{
                            height: 24,
                            width: 24,
                          }}
                        />
                      </Link>
                    )}
                    {socialLinks?.attributes?.instagramUrl && (
                      <Link
                        href={socialLinks?.attributes?.instagramUrl}
                        target="_blank"
                        aria-label="instagram"
                      >
                        <Image
                          src={instagram}
                          alt="instagram"
                          style={{
                            height: 24,
                            width: 24,
                          }}
                        />
                      </Link>
                    )}
                    {socialLinks?.attributes?.whatsappNumber && (
                      <Link
                        href={`https://wa.me/${socialLinks?.attributes.whatsappNumber}`}
                        target="_blank"
                        aria-label="whatsapp"
                      >
                        <Image
                          src={whatsapp}
                          alt="whatsapp"
                          style={{
                            height: 24,
                            width: 24,
                          }}
                        />
                      </Link>
                    )}
                    {socialLinks?.attributes?.linkedInUrl && (
                      <Link
                        href={socialLinks?.attributes?.linkedInUrl}
                        target="_blank"
                        aria-label="linkedin"
                      >
                        <Image
                          src={linkdin}
                          alt="linkdin"
                          style={{
                            height: 24,
                            width: 24,
                          }}
                        />
                      </Link>
                    )}

                    {socialLinks?.attributes?.twitterUrl && (
                      <Link
                        href={socialLinks?.attributes?.twitterUrl}
                        target="_blank"
                        aria-label="twitter"
                      >
                        <Image
                          src={twitter}
                          alt="twitter"
                          style={{
                            height: 24,
                            width: 24,
                          }}
                        />
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="tp-header-top-right d-flex align-items-center justify-content-end">
                    <HeaderTopRight />
                    <LandingTopHeaderContact />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-header-top  p-relative z-index-1  d-block d-sm-none landingTopHeader">
            <div className="ml-5 mr-5">
              <div className="tp-header-top-right d-flex align-items-center justify-content-between flex-row">
                <HeaderTopRight />
                <LandingTopHeaderContact shownOnlyNmber />
              </div>
            </div>
          </div>
          <div className="tp-header-main tp-header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        src={logo}
                        alt="logo"
                        style={{ height: 45, width: 155 }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 d-none d-lg-block">
                  <div className="main-menu menu-style-1 d-flex justify-content-start ml-30">
                    <nav className="tp-main-menu-content">
                      <OurShopMenus />

                      {/* {route.pathname == "/ourshop" ? (
                        <OurShopMenus />
                      ) : (
                        <Menus />
                      )} */}
                    </nav>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2 col-md-8 col-6">
                  <HeaderMainRight
                    setIsCanvasOpen={setIsCanvasOpen}
                    totalCount={totalCount}
                  />
                </div>
              </div>
            </div>
          </div>
          {/*Mobile Header */}
          <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  {/* <div className="col-xl-3 col-lg-3">
                    {!stopShowingAllCategoriesInHeader &&
                      route.pathname !== "/ourshop" && (
                        <div className="tp-header-category tp-category-menu tp-header-category-toggle">
                          <button
                            onClick={() => toggleCategoryDropdown()}
                            className="tp-category-menu-btn tp-category-menu-toggle"
                          >
                            <span>
                              <CategoryMenu />
                            </span>
                            {t("All Categories")}
                          </button>
                          <nav className="tp-category-menu-content">
                            <HeaderCategory
                              categories={categories}
                              isCategoryActive={isCategoryActive}
                              toggleCategoryDropdown={toggleCategoryDropdown}
                            />
                          </nav>
                        </div>
                      )}
                  </div> */}
                  {/* <div className="col-xl-6 col-lg-6"> */}
                  {/* <div className="main-menu menu-style-1">
                      <nav className="tp-main-menu-content">
                        {route.pathname == "/ourshop" ? (
                          <OurShopMenus />
                        ) : (
                          <Menus />
                        )}
                      </nav>
                    </div> */}
                  {/* </div> */}
                  {/* <div className="col-xl-3 col-lg-3">
                    <div className="tp-header-contact d-flex align-items-center justify-content-end">
                      <div className="tp-header-contact-icon">
                        <span>
                          <Phone />
                        </span>
                      </div>
                      <div className="tp-header-contact-content">
                        <h5>{t("Hotline:")}</h5>
                        <p>
                          <Link href="tel:402-763-282-46">+966-11199-8877</Link>
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        id="header-sticky-2"
        className={`tp-header-sticky-area ${sticky ? "header-sticky-2" : ""}`}
      >
        <div className="container">
          <div className="tp-mega-menu-wrapper p-relative">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="logo"
                      style={{ height: 45, width: 155 }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-md-7 d-none d-md-block">
                <div className="tp-header-sticky-menu main-menu menu-style-1 d-none d-lg-block">
                  <nav id="mobile-menu ">
                    <OurShopMenus />

                    {/* {route.pathname == "/ourshop" ? (
                      <OurShopMenus />
                    ) : (
                      <Menus />
                    )} */}
                  </nav>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-6">
                <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
                  <div className="tp-header-action-item d-none d-lg-block">
                    <Link href="/wishlist" className="tp-header-action-btn">
                      <Wishlist />
                      <span className="tp-header-action-badge">
                        {authChecked ? wishlist?.length : 0}
                      </span>
                    </Link>
                  </div>

                  <div className="tp-header-action-item">
                    <button
                      onClick={() => dispatch(openCartMini())}
                      type="button"
                      className="tp-header-action-btn cartmini-open-btn"
                      aria-label="cart-icon"
                    >
                      <CartTwo />
                      <span className="tp-header-action-badge">
                        {authChecked ? totalCount : 0}
                      </span>
                    </button>
                  </div>
                  <div className="tp-header-action-item d-none d-lg-block">
                    <Link
                      href={!authChecked ? "/login" : "/profile"}
                      className="tp-header-action-btn"
                    >
                      <User />
                    </Link>
                  </div>
                  <div className={"tp-header-action-item d-lg-none"}>
                    <button
                      onClick={() => setIsCanvasOpen(true)}
                      type="button"
                      className="tp-header-action-btn tp-offcanvas-open-btn"
                      aria-label="menu-drawer"
                    >
                      <Menu />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartMiniSidebar />
      {/* {route.pathname == "/ourshop" ? ( */}
      <OurShopCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="electronics"
        categories={categories}
      />
      {/* ) : (
        <OffCanvas
          isOffCanvasOpen={isOffCanvasOpen}
          setIsCanvasOpen={setIsCanvasOpen}
          categoryType="electronics"
          categories={categories}
          stopShowingAllCategoriesInHeader={stopShowingAllCategoriesInHeader}
        />
      )} */}
    </>
  );
};

export default Header;
