import useLoadingState from "@/hooks/use-loading";
import { useTranslations } from "next-intl";
import React from "react";
import SearchPrdLoader from "../loader/search-prd-loader";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import CNImage from "../CNImage";

const AboutDetail = (props) => {
  const t = useTranslations("header");
  const loading = useLoadingState();
  return (
    <>
      {loading ? (
        <div>
          <SearchPrdLoader />
        </div>
      ) : (
        <div className="container pt-50 pb-50">
          <div className="d-flex col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <CNImage
                  src={props?.attributes?.image?.data?.attributes?.url}
                  alt="image"
                  width={100}
                  height={100}
                  quality={100}
                  style={{
                    objectFit: "fill",
                    layout: "responsive",
                    height: "60vh",
                    width: "100%",
                  }}
                  className="img-fluid"
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="mt-30 text-center">
                  <div>
                    <p className="text-heading">{t("Get To Know Us Better")}</p>
                  </div>
                  <div>
                    <h5 className="p-about">{t("About Us")}</h5>
                  </div>
                </div>
                <div className="mt-30">
                  <h5 className="text-size mt-20" style={{ direction: "ltr" }}>
                    {props?.attributes?.title}
                  </h5>
                  <div className="mt-20" style={{ direction: "ltr" }}>
                    <ReactMarkdown
                      children={props?.attributes?.description}
                      remarkPlugins={[remarkGfm]}
                      className="markdown"
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
                            style={{ fontSize: "16px", color: "black" }}
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <p
                            style={{ fontSize: "16px", color: "black" }}
                            fontWeight={"400"}
                            {...props}
                          />
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutDetail;
