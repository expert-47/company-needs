import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import ProductItem from "../products/product-item";
import ErrorMsg from "../common/error-msg";
import { HomeNewArrivalPrdLoader } from "../loader";

const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 24,
  navigation: {
    nextEl: ".tp-related-slider-button-next",
    prevEl: ".tp-related-slider-button-prev",
  },
  autoplay: {
    delay: 5000,
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const RelatedProducts = ({ product, isError, isLoading }) => {
  let content = null;

  if (isLoading) {
    content = <HomeNewArrivalPrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && product?.length > 0) {
    content = (
      <Swiper
        {...slider_setting}
        modules={[Autoplay, Navigation]}
        slidesPerView={5}
        className="tp-product-related-slider-active swiper-container mb-10"
      >
        {product.map((item) => (
          <SwiperSlide key={item._id}>
            <ProductItem product={item} primary_style={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return <div className="tp-product-related-slider">{content}</div>;
};

export default RelatedProducts;
