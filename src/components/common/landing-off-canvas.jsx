import Link from "next/link";
import Image from "next/image";
import { CloseTwo } from "@/svg";
import logo from "@assets/img/logo/headerlogo.png";
import { useTranslations } from "next-intl";
import LandingMobileMenus from "./landing-mobile-menu";

const LandingOffCanvas = ({ isOffCanvasOpen, setIsCanvasOpen }) => {
  const t = useTranslations("header");
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
            <div className="offcanvas__top mb-50 d-flex justify-content-between align-items-center">
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
            <div className="tp-main-menu-mobile fix d-lg-none ">
              <LandingMobileMenus setIsCanvasOpen={setIsCanvasOpen} />
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

export default LandingOffCanvas;
