import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@assets/img/logo/headerlogo.png";
import pay from "@assets/img/footer/footer-pay.png";
import { Email, Facebook, Location } from "@/svg";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";
import FacebookSvg from "@assets/img/footer-social-icons/facebook";
import YoutubeSvg from "@assets/img/footer-social-icons/youtube";
import WhatsappSvg from "@assets/img/footer-social-icons/whatsapp";
import InstagramSvg from "@assets/img/footer-social-icons/instagram";
import TikTokSvg from "@assets/img/footer-social-icons/tiktok";
import TwitterSvg from "@assets/img/footer-social-icons/twitter";
import LinkedInSvg from "@assets/img/footer-social-icons/linkedin";
import { useRouter } from "next/router";

const Footer = ({ socialLinks }) => {
  const t = useTranslations("header");
  const router = useRouter();
  const authChecked = useAuthCheck();
  const [encodedAddress, setEncodedAddress] = useState("");
  useEffect(() => {
    const address = "As Sahafah, Olaya St. 6531, 3059. Riyadh 13321";
    setEncodedAddress(encodeURIComponent(address));
  }, []);

  return (
    <footer>
      <div className="primary_style pt-100">
        <div className="tp-footer-top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-3 col-md-5 col-sm-6">
                <div className="tp-footer-widget footer-col-1 mb-20">
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <Image
                          src={logo}
                          alt="logo"
                          style={{
                            height: 45,
                            width: 155,
                          }}
                        />
                      </Link>
                    </div>
                    <p
                      className="tp-footer-desc"
                      style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginBottom: "0px",
                      }}
                    >
                      {t(
                        "Elevate Your Workspace: Where Office Efficiency Meets Quality Excellence"
                      )}
                    </p>
                    <div className="tp-footer-social footerSocialIcons">
                      {socialLinks?.attributes?.youtubeUrl && (
                        <Link
                          href={socialLinks?.attributes?.youtubeUrl}
                          target="_blank"
                          aria-label="Youtube"
                        >
                          <YoutubeSvg />
                        </Link>
                      )}
                      {socialLinks?.attributes?.whatsappNumber && (
                        <Link
                          href={`https://wa.me/${socialLinks?.attributes.whatsappNumber}`}
                          target="_blank"
                          aria-label="whatsapp"
                        >
                          <WhatsappSvg />
                        </Link>
                      )}
                      {socialLinks?.attributes?.facebookUrl && (
                        <Link
                          href={socialLinks?.attributes?.facebookUrl}
                          target="_blank"
                          aria-label="facebook"
                        >
                          <FacebookSvg />
                        </Link>
                      )}
                      {socialLinks?.attributes?.instagramUrl && (
                        <Link
                          href={socialLinks?.attributes?.instagramUrl}
                          target="_blank"
                          aria-label="instagram"
                        >
                          <InstagramSvg />
                        </Link>
                      )}
                      {/* {socialLinks?.attributes?.twitterUrl && ( */}
                      <Link
                        href={"https://www.tiktok.com/"}
                        target="_blank"
                        aria-label="tiktok"
                      >
                        <TikTokSvg />
                      </Link>
                      {/* )} */}
                      {socialLinks?.attributes?.twitterUrl && (
                        <Link
                          href={socialLinks?.attributes?.twitterUrl}
                          target="_blank"
                          aria-label="twitter"
                        >
                          <TwitterSvg />
                        </Link>
                      )}
                      {socialLinks?.attributes?.linkedInUrl && (
                        <Link
                          href={socialLinks?.attributes?.linkedInUrl}
                          target="_blank"
                          style={{ marginTop: "5px" }}
                          aria-label="linkedin"
                        >
                          <LinkedInSvg />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6">
                <div className="tp-footer-widget footer-col-2 pb-20">
                  <h4 className="tp-footer-widget-title">{t("My Account")}</h4>
                  <div
                    className="tp-footer-widget-content"
                    style={{
                      fontWeight: 600,
                      listStyle: "none",
                      lineHeight: "2.5",
                      fontFamily: "var(--tp-ff-roboto)",
                      fontSize: "15px",
                    }}
                  >
                    <div>
                      {!authChecked ? (
                        <Link href="/login">{t("Cart")}</Link>
                      ) : (
                        <Link href="/cart">{t("Cart")}</Link>
                      )}
                    </div>
                    <div>
                      {!authChecked ? (
                        <Link href="/login">{t("Wishlist")}</Link>
                      ) : (
                        <Link href="/wishlist">{t("Wishlist")}</Link>
                      )}
                    </div>
                    <div>
                      {!authChecked ? (
                        <Link href="/login">{t("My Account")}</Link>
                      ) : (
                        <Link href="/profile">{t("My Account")}</Link>
                      )}
                    </div>
                    <div>
                      {!authChecked ? (
                        <Link href="/login">{t("My Orders")}</Link>
                      ) : (
                        <Link href="/orders">{t("My Orders")}</Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-3 pb-20">
                  <h4 className="tp-footer-widget-title">{t("Information")}</h4>
                  <div
                    className="tp-footer-widget-content"
                    style={{
                      fontWeight: 600,
                      listStyle: "none",
                      lineHeight: "2.5",
                      fontFamily: "var(--tp-ff-roboto)",
                      fontSize: "15px",
                    }}
                  >
                    <div>
                      <Link href="/privacy-policy">{t("Privacy Policy")}</Link>
                    </div>
                    <div>
                      <Link href="./terms-and-condition">
                        {t("Terms & Conditions")}
                      </Link>
                    </div>
                    <div>
                      <Link href="/contact">{t("Contact Us")}</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="tp-footer-widget footer-col-4 mb-20">
                  <h4 className="tp-footer-widget-title">{t("Talk To Us")}</h4>
                  <div className="tp-footer-widget-content">
                    <div className="tp-footer-talk mb-15">
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        {t("Got Questions? Call us")}
                      </span>
                      <h4 className="pt-10">
                        <Link href="tel:966-11199-8877">
                          {router.locale == "ar"
                            ? "966-11199-8877+"
                            : "+966-11199-8877"}
                        </Link>
                      </h4>
                    </div>
                    <div className="tp-footer-contact">
                      <div className="tp-footer-contact-item d-flex align-items-start">
                        <div className="tp-footer-contact-icon">
                          <span className="marginRightZeroInArabic">
                            <Email />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content text-align-center">
                          <p
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}
                          >
                            <Link href="mailto:companyneeds@support.com">
                              companyneeds@support.com
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="tp-footer-contact-item d-flex align-items-center text-align-center">
                        <div className="tp-footer-contact-icon">
                          <span className="marginRightZeroInArabic">
                            <Location />
                          </span>
                        </div>
                        <div className="tp-footer-contact-content">
                          <p
                            className="mb-0"
                            style={{
                              fontSize: "17px",
                              fontWeight: "bold",
                            }}
                          >
                            <Link
                              href={`https://www.google.com/maps/place/${encodedAddress}`}
                              target="_blank"
                              className="list-group-item list-group-item-action d-flex gap-3"
                              aria-current="true"
                            >
                              {t("79 Sleepy Hollow St")}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-footer-bottom">
          <div className="container">
            <div className="tp-footer-bottom-wrapper">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="tp-footer-copyright text-center">
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      © {new Date().getFullYear()}{" "}
                      {t("All Rights Reserved by Company Needs")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
