import { useTranslations } from "next-intl";
import React from "react";

const HomeButtons = () => {
  const t = useTranslations("header");
  return (
    <div className="container pb-120">
      <div className="container d-grid col-lg-12">
        <div className="row justify-content-lg-center">
          <div className="col-sm-12 col-lg-7">
            <div className="row justify-content-around">
              <div className="col-sm-5 col-lg-5 mb-3 mb-sm-0">
                <div className="row">
                  <button
                    className="btn bg-black text-white"
                    style={{
                      fontSize: "32px",
                      fontWeight: 600,
                      borderRadius: "12px",
                    }}
                  >
                    {t("Our Services")}
                  </button>
                </div>
              </div>
              <div className="col-sm-5 col-lg-5">
                <div className="row">
                  <button
                    className="btn bg-primary text-white"
                    style={{
                      fontSize: "32px",
                      fontWeight: 600,
                      borderRadius: "12px",
                    }}
                  >
                    {t("Our Categories")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeButtons;
