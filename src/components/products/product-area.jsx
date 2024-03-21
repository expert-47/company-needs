/** @format */

import React, { useEffect, useState } from "react";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { ShapeLine, TabLine } from "@/svg";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import HomePrdLoader from "@/components/loader/home/home-prd-loader";
import { useTranslations } from "next-intl";

const tabs = ["new", "featured", "topSellers"];

const ProductArea = ({ products, isError, isLoading }) => {
  const t = useTranslations("header");
  const [activeTab, setActiveTab] = useState("new");
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };
  let content = null;
  if (isLoading) {
    content = <HomePrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.length > 0) {
    content = products.map((prd, i) => (
      <div key={i} className="col-xl-3 col-lg-4 col-sm-6">
        <ProductItem product={prd} />
      </div>
    ));
  }
  return (
    <section className="tp-product-area pb-55">
      <div className="container">
        <div className="row  align-items-center mb-40">
          <div className="col-xl-5 col-lg-6 col-md-5">
            <div className="tp-section-title-wrapper">
              <h3 className="tp-section-title">
                {t("Trending Products")}
                <ShapeLine />
              </h3>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-7">
            <div className="tp-product-arrival-border"></div>
          </div>
        </div>
        <div className="row">{content}</div>
      </div>
    </section>
  );
};

export default ProductArea;
