import React from "react";
import { SmDot } from "@/svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const ProductDetailsBreadcrumb = ({ category, title }) => {
  const t = useTranslations("header");
  const router = useRouter();
  return (
    <section className="breadcrumb__area breadcrumb__style-2 include-bg pt-50 pb-20">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <div className="breadcrumb__list has-icon">
                <span className="breadcrumb-icon">
                  <SmDot />{" "}
                </span>
                <span>
                  <a rel="noopener noreferrer" href="/">
                    {t("Home")}
                  </a>
                </span>
                <span>
                  <a rel="noopener noreferrer" href="#">
                    {category}
                  </a>
                </span>
                <span className={router.locale == "ar" ? "mr-20" : ""}>
                  {title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsBreadcrumb;
