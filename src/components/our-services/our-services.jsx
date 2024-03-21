import React from "react";
import { ourServicesData, ourFilesData } from "./data";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

const OurServices = () => {
  const t = useTranslations("header");

  return (
    <div className="about-us-bg-image pb-40">
      <div className="text-center pt-30">
        <div className="d-flex justify-content-center" id="our-services">
          <h1 className="borderBottomAboutUs">{t("OUR SERVICES")}</h1>
        </div>
        <p className="textHeadingsColor managefontSize">
          {t("Make Your Selection Below")}
        </p>
      </div>
      <div className="container containerMarginTop">
        <div className="row">
          {ourServicesData?.map((item, index) => {
            return (
              <div
                key={"succes in numbers" + index}
                className="col-xs-12 col-sm-12 col-md-6 col-lg-4 d-flex flex-column justify-content-center align-items-center mt-35 changeColorOnHover clearAllCursor"
              >
                <Link href={item?.link}>
                  <div className="ourServicesImageBox">
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
                        border: "2px solid #1c8cfc",
                      }}
                    />
                  </div>
                </Link>

                <h5 className="mt-30">{t(`${item?.ImageDescription}`)}</h5>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center pt-30" id="our-files">
        <div className="d-flex justify-content-center">
          <h1 className="borderBottomAboutUs">{t("OUR FILES")}</h1>
        </div>
        <p className="textHeadingsColor managefontSize">
          {t("Download Our Files Below")}
        </p>
      </div>
      <div className="container">
        {ourFilesData?.map((item) => {
          return (
            <div
              key={item}
              style={{ zIndex: 1 }}
              className="d-flex justify-content-between pb-25 pt-25 ourFilesDataParentDiv"
            >
              <div>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  {t(`${item}`)}
                </p>
              </div>
              <div>
                <Link
                  href={"https://www.africau.edu/images/default/sample.pdf"}
                  target="blank"
                  rel="noopener noreferrer"
                  download
                >
                  <button type="button" class="btn btn-lg DownloadButtonDesign">
                    {t("Download")}
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurServices;
