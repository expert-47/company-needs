import React from "react";
import menu_data from "@/data/menu-data";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";

const Menus = () => {
  const authChecked = useAuthCheck();
  const t = useTranslations("header");
  return (
    <ul aria-label="navbar-list">
      {menu_data.map((menu) => (
        <li key={menu.id} aria-label="navbar-items">
          {!authChecked && [4].includes(menu.id) ? (
            <Link href="/login" aria-label={t(menu.title)}>
              {t(menu.title)}
            </Link>
          ) : (
            <Link href={menu.link} aria-label={t(menu.title)}>
              {t(menu.title)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menus;
