import React from "react";

import { successData } from "./data";
import Image from "next/image";
import { useTranslations } from "next-intl";

const OurSuccess = () => {
  const t = useTranslations("header");

  return (
    <div className="pb-40 ourSuccessParentDiv">
      <div className="text-center pt-30">
        <div className="d-flex justify-content-center">
          <h1 className="borderBottomAboutUs">{t("Our Success In Numbers")}</h1>
        </div>
        <p className="textHeadingsColor " style={{ fontSize: "13px" }}>
          {t("Our Numbers Set Us Apart")}
        </p>
      </div>
      <div className="container containerMarginTop">
        <div className="row">
          {successData?.map((item, index) => {
            return (
              <div
                key={"succes in numbers" + index}
                className="col-xs-12 col-sm-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-center"
              >
                <div
                  style={{
                    width: 240,
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

                <h1 className="text-center textHeadingsColor mt-2">
                  {item?.CardTitle}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurSuccess;
