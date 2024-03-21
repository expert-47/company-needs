import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";

const ShopBreadcrumb = ({ title, firstSubtitle, subtitle }) => {
  const t = useTranslations("header");
  const router = useRouter();
  return (
    <>
      <section className="breadcrumb__area include-bg pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <h3 className="breadcrumb__title">{title}</h3>
                <div className="breadcrumb__list">
                  <span>
                    <a rel="noopener noreferrer" href="/">
                      {t("Home")}
                    </a>
                  </span>
                  {firstSubtitle && <span>{firstSubtitle}</span>}
                  <span className={router.locale == "ar" ? "mr-20" : ""}>
                    {subtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopBreadcrumb;
