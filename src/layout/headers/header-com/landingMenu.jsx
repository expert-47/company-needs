import React from "react";
import { useTranslations } from "next-intl";
import landing_menu_data from "@/data/landing-menu-data";
import { Link as ScrollLink } from "react-scroll";
import Link from "next/link";

const LandingMenu = () => {
  const t = useTranslations("header");
  return (
    <ul aria-label="navbar-list">
      {landing_menu_data.map((menu, index) => (
        <>
          {index === 1 && (
            <li aria-label="navbar-items">
              <ScrollLink
                to={"about"}
                spy={true}
                smooth={true}
                offset={-150}
                duration={100}
                style={{ cursor: "pointer" }}
                className="fontWeightBold"
              >
                {t("About Us")}
              </ScrollLink>
            </li>
          )}
          {index == 1 && (
            <li aria-label="navbar-items">
              <ScrollLink
                to={"our-services"}
                spy={true}
                smooth={true}
                offset={-160}
                duration={100}
                style={{ cursor: "pointer" }}
                className="fontWeightBold"
              >
                {t(menu.title)}
              </ScrollLink>
            </li>
          )}
          {index != 1 && (
            <li
              key={menu.id}
              aria-label="navbar-items"
              style={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => {
                const subMenu = document.getElementById(`subMenu-${menu.id}`);
                if (subMenu) subMenu.style.display = "block";
              }}
              onMouseLeave={() => {
                const subMenu = document.getElementById(`subMenu-${menu.id}`);
                if (subMenu) subMenu.style.display = "none";
              }}
            >
              {menu?.title === "Contact Us" ? (
                <ScrollLink
                  to={"get-in-touch"}
                  spy={true}
                  smooth={true}
                  offset={-190}
                  duration={100}
                  style={{ cursor: "pointer" }}
                  className="fontWeightBold"
                >
                  {t(menu.title)}
                </ScrollLink>
              ) : menu?.title === "Our Files" ? (
                <ScrollLink
                  to={"our-files"}
                  spy={true}
                  smooth={true}
                  offset={-130}
                  duration={100}
                  style={{ cursor: "pointer" }}
                  className="fontWeightBold"
                >
                  {t(menu.title)}
                </ScrollLink>
              ) : (
                <Link
                  href={menu.link}
                  aria-label={t(menu.title)}
                  style={{ cursor: "pointer" }}
                  className="fontWeightBold"
                >
                  {t(menu.title)}
                </Link>
              )}

              {menu.subMenu && (
                <ul
                  id={`subMenu-${menu.id}`}
                  style={{
                    display: "none",
                    position: "absolute",
                    left: 0,
                    width: "180px",
                    padding: "10px 10px 0px 10px",
                    backgroundColor: "#fff",
                    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                    zIndex: 999,
                  }}
                >
                  {menu.subMenu.map((subMenu) => (
                    <p key={subMenu.id} style={{ color: "black" }}>
                      {!subMenu.id === 2.1 ? (
                        <Link
                          href={subMenu.link}
                          target="blank"
                          rel="noopener noreferrer"
                          download
                        >
                          {subMenu.title}
                        </Link>
                      ) : (
                        <Link href={subMenu.link} target="blank">
                          {subMenu.title}
                        </Link>
                      )}
                    </p>
                  ))}
                </ul>
              )}
            </li>
          )}
        </>
      ))}
    </ul>
  );
};

export default LandingMenu;
