import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@assets/img/logo/headerlogo.png";
import { Phone, Menu, User } from "@/svg";
import { useTranslations } from "next-intl";
import HeaderTopRight from "./header-com/header-top-right";
import LandingMenu from "./header-com/landingMenu";
import useSticky from "@/hooks/use-sticky";
import LandingOffCanvas from "@/components/common/landing-off-canvas";
import LandingTopHeaderContact from "./header-com/landing-header-contact";
import TwitterIcon from "@assets/img/icon/twitter";
import { useRouter } from "next/router";
import useAuthCheck from "@/hooks/use-auth-check";
import facebook from "../../../public/assets/img/top-header-social-icons/facebook.png";
import instagram from "../../../public/assets/img/top-header-social-icons/instagram.png";
import linkdin from "../../../public/assets/img/top-header-social-icons/linkdin.png";
import whatsapp from "../../../public/assets/img/top-header-social-icons/whatsapp.png";
import twitter from "../../../public/assets/img/top-header-social-icons/x.png";

const LandingPageHeader = ({ socialLinks }) => {
  const t = useTranslations("header");
  const route = useRouter();
  const authChecked = useAuthCheck();

  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);

  return (
    <div
      style={{
        zIndex: 99,
        position: "fixed",
        backgroundColor: "white",
        width: "100vw",
      }}
    >
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
          <div className="row align-items-center d-flex justify-content-between">
            <div className="col-7 col-xl-2 col-lg-2 col-md-4">
              <div className="logo">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="logo"
                    style={{ height: 48, width: 155 }}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-9 d-none d-lg-block">
              <div
                className={
                  route.locale == "ar"
                    ? "main-menu menu-style-1 d-flex mr-50 "
                    : "main-menu menu-style-1 d-flex  ml-50"
                }
                style={{
                  marginRight: route.locale == "ar" ? "50px" : "",
                }}
              >
                <nav className="tp-main-menu-content">
                  <LandingMenu />
                </nav>
              </div>
            </div>
            <div className="col-lg-1 d-none d-lg-block">
              <div>
                <Link
                  href={!authChecked ? "/login" : "/profile"}
                  aria-label="UserImage"
                  style={{
                    float: "inline-end",
                  }}
                >
                  <User color={"#0989ff"} />
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-1 d-none d-lg-block"> */}
            {/* <div className="tp-header-contact d-flex align-items-center justify-content-center">
                <div className="tp-header-contact-icon">
                  <span>
                    <Phone />
                  </span>
                </div>
                <div className="tp-header-contact-content ">
              
                  <p className="mt-2">
                    <Link href="tel:402-763-282-46">+966-11199-8877</Link>
                  </p>
                  <Link href="mailto:ompanyneeds@support.com">
                    companyneeds@support.com
                  </Link>
                </div>
              </div> */}
            {/* <div className="d-flex justify-content-end">
                <Link
                  href={!authChecked ? "/login" : "/profile"}
                  aria-label="UserImage"
                >
                  <User color={"#0989ff"} />
                </Link>
              </div> */}
            {/* </div> */}
            <div className="col-3 col-md-4 tp-header-action-item d-lg-none">
              <div className="d-flex justify-content-end">
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
      <LandingOffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="electronics"
      />
    </div>
  );
};

export default LandingPageHeader;
