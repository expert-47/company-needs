import React from "react";

import { helpBusinessData } from "./data";
import Image from "next/image";
import { useTranslations } from "next-intl";

const HelpBusiness = () => {
  const t = useTranslations("header");
  return (
    <div className="pb-40 helpBusinessParentDiv ">
      <div className="text-center pt-30">
        <div className="d-flex justify-content-center">
          <h3 className="helpBusinessSectionTitle">
            {t("How")} <q>Company Needs</q> {t("Can Help Your Business")}
          </h3>
        </div>
      </div>
      <div className="container containerMarginTop">
        <div className="row">
          {helpBusinessData?.map((item, index) => {
            return (
              <div
                key={"succes in numbers" + index}
                className="col-xs-12 col-sm-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-center"
              >
                <div
                  style={{
                    width: 270,
                    height: 240,
                  }}
                >
                  <Image
                    src={item?.Image}
                    alt="image"
                    width={150}
                    height={150}
                    quality={100}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>

                <h5 className="imageDescription">
                  {t(`${item?.ImageDescription}`)}
                </h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HelpBusiness;
