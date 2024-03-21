import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ourShop_menu_data from "@/data/ourshop-menu-data";
import { Link as ScrollLink } from "react-scroll";
import { useRouter } from "next/router";

const OurShopMenus = () => {
  const t = useTranslations("header");
  const route = useRouter();
  return (
    <ul aria-label="navbar-list" className="d-flex justify-content-start ml-20">
      {ourShop_menu_data.map((menu, index) => {
        return (
          <>
            {index === 1 && route.pathname == "/ourshop" ? (
              <li
                aria-label=" navbar-items border
              "
              >
                <ScrollLink
                  to={"categories"}
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={100}
                  style={{ cursor: "pointer" }}
                  className="fontWeightBold"
                >
                  {t("Categories")}
                </ScrollLink>
              </li>
            ) : (
              index === 1 && (
                <li key={menu.id} aria-label="navbar-items">
                  <Link
                    href={"/ourshop"}
                    aria-label={"Categories"}
                    className="fontWeightBold"
                  >
                    {t("Categories")}
                  </Link>
                </li>
              )
            )}

            <li key={menu.id} aria-label="navbar-items">
              <Link
                href={menu.link}
                aria-label={t(menu.title)}
                className="fontWeightBold"
              >
                {t(menu.title)}
              </Link>
            </li>
          </>
        );
      })}
    </ul>
  );
};

export default OurShopMenus;
