/** @format */

import { GridTab, ListTab, Menu } from "@/svg";
import ThreeDotIcon from "@/svg/three-dot-icon";
import { useTranslations } from "next-intl";
import React from "react";

const ShopTopLeft = ({ total, showing = 9, startIndex = 1, endIndex = 1 }) => {
  const t = useTranslations("header");
  return (
    <>
      <div className="tp-shop-top-left d-flex align-items-center ">
        <div className="tp-shop-top-tab tp-tab overideDefaultMarginClass">
          <ul className="nav nav-tabs " id="productTab" role="tablist">
            <li className="nav-item " role="presentation">
              <button
                className="nav-link d-none d-md-block"
                id="list-tab"
                data-bs-toggle="tab"
                data-bs-target="#list-tab-pane"
                type="button"
                role="tab"
                aria-controls="list-tab-pane"
                aria-selected="false"
                tabIndex={-1}>
                <ListTab />
              </button>
            </li>
            {/* <li className="nav-item" role="presentation">
              <button
                className="nav-link d-none d-md-block "
                id="double-tab"
                data-bs-toggle="tab"
                data-bs-target="#double-tab-pane"
                type="button"
                role="tab"
                aria-controls="double-tab-pane"
                aria-selected="false"
                tabIndex={-1}>
                <GridTab />
              </button>
            </li> */}
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active  d-none d-md-block"
                id="grid-tab"
                data-bs-toggle="tab"
                data-bs-target="#grid-tab-pane"
                type="button"
                role="tab"
                aria-controls="grid-tab-pane"
                aria-selected="true"
                tabIndex={-1}>
                <ThreeDotIcon />
              </button>
            </li>
          </ul>
        </div>
        {/* <div className="tp-shop-top-result">
          <p>
            {t("Showing")} {startIndex}–{endIndex} {t("of")} {total}{" "}
            {t("results")}
          </p>
        </div> */}
      </div>
    </>
  );
};

export default ShopTopLeft;
