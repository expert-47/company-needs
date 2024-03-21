import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import DetailsTabNav from "./details-tab-nav";

const ProductDetailsArea = ({ productItem, productReviews }) => {
  const { img, videoId, status } = productItem || {};
  const [activeImg, setActiveImg] = useState(img);
  useEffect(() => {
    setActiveImg(img);
  }, [img]);
  return (
    <section className="tp-product-details-area">
      <div className="tp-product-details-top pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <DetailsThumbWrapper
                activeImg={activeImg}
                imageURLs={productItem}
                videoId={videoId}
                status={status}
              />
            </div>
            <div className="col-xl-5 col-lg-6">
              <DetailsWrapper
                productReviews={productReviews}
                productItem={productItem}
                activeImg={activeImg}
                detailsBottom={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="tp-product-details-bottom pb-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <DetailsTabNav
                product={productItem}
                productReviews={productReviews}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsArea;
