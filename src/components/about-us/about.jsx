import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import CNImage from "../CNImage";
import { useRouter } from "next/router";

const AboutPage = (props) => {
  const { title, description, onClick, image, heading } = props;
  const t = useTranslations("header");
  const route = useRouter();

  return (
    <div className="about-us-bg-image">
      <div
        className="container pt-40"
        id={title === "Our Services" ? "our-services" : "about"}
      >
        {heading && (
          <div className="text-center">
            <div className="d-flex justify-content-center">
              <h1 className="borderBottomAboutUs">{t("About Us")}</h1>
            </div>
            <p className="textHeadingsColor " style={{ fontSize: "13px" }}>
              {heading}
            </p>
          </div>
        )}
        {/* <div className="text-center">
          <p className="p-about">{title}</p>
        </div> */}
        <div className="d-flex  mb-40 col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="row d-flex justify-content-between">
            <div className="left-side col-xs-12 col-sm-12 col-md-6 col-lg-5 d-flex justify-content-center">
              <div>
                <h2 className="textHeadingsColor">{title}</h2>
              </div>
              <div>
                <p className="text-size-p mt-35" style={{ direction: "ltr" }}>
                  <ReactMarkdown
                    children={[description?.slice(0, 276)] + ""}
                    remarkPlugins={[remarkGfm]}
                    className="markdown manageMarkDownFontSize"
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          style={{ fontSize: "32px", color: "black" }}
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          style={{ fontSize: "20px", color: "black" }}
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          style={{ fontSize: "24px", color: "black" }}
                          {...props}
                        />
                      ),
                      h4: ({ node, ...props }) => (
                        <h4
                          style={{ fontSize: "20px", color: "black" }}
                          {...props}
                        />
                      ),
                      h5: ({ node, ...props }) => (
                        <h5
                          style={{ fontSize: "18px", color: "black" }}
                          {...props}
                        />
                      ),
                      h6: ({ node, ...props }) => (
                        <h6
                          style={{ fontSize: "18px", color: "black" }}
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          style={{ fontSize: "21px", fontWeight: 50 }}
                          {...props}
                          className="mb-30"
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <p
                          style={{ fontSize: "20px", color: "black" }}
                          fontWeight={"400"}
                          {...props}
                          className="mb-30"
                        />
                      ),
                    }}
                  />
                </p>
              </div>
              <div
                className="d-flex mt-35 align-items-center"
                style={{ direction: "ltr" }}
              >
                <p className="text-size-link mb-0 mb-3 d-flex align-items-center">
                  <p
                    onClick={onClick}
                    target="blank"
                    aria-label="click-here"
                    className="text-primary"
                    style={{
                      // fontWeight: "bold",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {t("Read More")}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M10.0758 8.22704L17.5004 8.22704M17.5004 8.22704L17.5004 15.6517M17.5004 8.22704L7.9545 17.773"
                        stroke="#175CFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 categoryImageWrapperDiv">
              <CNImage
                src={image}
                alt="image"
                width={100}
                height={100}
                quality={100}
                style={{
                  height: "90%",
                  width: "90%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
