import React from "react";
import CNImage from "../CNImage";
const PopupThumbWrapper = ({
  imageURLs,
  imgWidth = 416,
  imgHeight = 500,
  status,
}) => {
  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              <CNImage
                src={imageURLs}
                alt="product img"
                width={imgWidth}
                height={imgHeight}
                quality={100}
                style={{
                  layout: "responsive",
                  cursor: "auto",
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                }}
                className="img-fluid"
              />
              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">out-stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupThumbWrapper;
