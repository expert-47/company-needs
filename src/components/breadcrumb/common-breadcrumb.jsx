import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const CommonBreadcrumb = ({
  title,
  subtitle,
  center = false,
  bg_clr = false,
}) => {
  const t = useTranslations("header");
  const router = useRouter();
  return (
    <section
      className={`breadcrumb__area ${
        center ? "text-center" : ""
      } include-bg pt-50 `}
      style={{ backgroundColor: bg_clr && `#EFF1F5` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content p-relative z-index-1">
              <h3 className="breadcrumb__title">{title}</h3>
              <div className="breadcrumb__list">
                <span
                  style={{
                    marginLeft: router.locale == "ar" ? "15px" : "",
                  }}
                >
                  <Link href="/">{t("Home")}</Link>
                </span>
                <span>{subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonBreadcrumb;
