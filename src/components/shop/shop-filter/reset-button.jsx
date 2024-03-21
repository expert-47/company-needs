import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";

const ResetButton = ({ shop_right = false, handleResetFilters }) => {
  const t = useTranslations("header");
  const router = useRouter();

  const handleResetFilter = () => {
    const newUrl = `/${shop_right ? "shop-right-sidebar" : "products"}`;
    router.push(newUrl);
    handleResetFilters();
  };

  return (
    <div className="tp-shop-widget mb-50">
      <button onClick={handleResetFilter} className="tp-btn">
        {t("Reset Filter")}
      </button>
    </div>
  );
};

export default ResetButton;
