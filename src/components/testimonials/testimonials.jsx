import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { Review_Data } from "@/data/testimonial-data";
import quote from "@assets/img/testimonial/testimonial-quote.png";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";

const slider_setting = {
  slidesPerView: 2,
  spaceBetween: 24,
  pagination: {
    el: ".tp-testimoinal-slider-dot-3",
    clickable: true,
  },
  navigation: {
    nextEl: ".tp-testimoinal-slider-button-next-3",
    prevEl: ".tp-testimoinal-slider-button-prev-3",
  },
  breakpoints: {
    992: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 1,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const Testimonials = (productReviews) => {
  const t = useTranslations("header");
  const [textMore, setTextMore] = useState(false);
  return (
    <>
      <section className="tp-testimonial-area pt-80 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-section-title-wrapper-3 mb-80 text-center">
                <span className="tp-section-title-pre-3">
                  {t("Customers Review")}
                </span>
                <h2 className="tp-section-title-3">
                  {t("What our Clients say")}
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-testimonial-slider-3">
                <Swiper
                  {...slider_setting}
                  modules={[Pagination, Navigation]}
                  className="tp-testimoinal-slider-active-3 swiper-container"
                >
                  {productReviews?.productReviews?.map((item) => (
                    <SwiperSlide
                      key={item?.id}
                      className="tp-testimonial-item-3 grey-bg-7 p-relative z-index-1"
                    >
                      <div className="tp-testimonial-shape-3">
                        <Image
                          className="tp-testimonial-shape-3-quote"
                          src={quote}
                          alt="quote img"
                        />
                      </div>
                      <div className="tp-testimonial-rating tp-testimonial-rating-3">
                        <Rating
                          fillColor="#010F1C"
                          readonly={true}
                          allowFraction
                          size={20}
                          initialValue={item?.attributes?.ratings}
                        />
                      </div>
                      <div
                        className="tp-testimonial-content-3"
                        style={{ direction: "ltr" }}
                      >
                        {item?.attributes?.text?.length > 0 ? (
                          <p >
                            {textMore
                              ? item?.attributes?.text
                              : `${item?.attributes?.text?.substring(0, 150)}`}{" "}
                            <span className="text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() => setTextMore(!textMore)}
                              hidden={item?.attributes?.text?.length < 150}
                            >
                              {" "}  {textMore ? t("See Less") : t("See More")}
                            </span>
                          </p>
                        ) : (
                          <p>{t("No Description")}</p>
                        )}
                      </div>
                      <div className="tp-testimonial-user-wrapper-3 d-flex">
                        <div className="tp-testimonial-user-3 d-flex align-items-center">
                          <div className="tp-testimonial-avater-3 tp-product-details-review-avater-thumb mr-10">
                            <h5 className="review-name text-uppercase">{item?.attributes?.users_permissions_user?.data?.attributes?.company_profile?.data?.attributes?.companyName?.slice(0, 2) || item?.attributes?.users_permissions_user?.data?.attributes?.user_profile?.data?.attributes?.first_name?.slice(0, 2) || "CN"}</h5>
                          </div>
                          <div className="tp-testimonial-user-3-info tp-testimonial-user-translate">
                            <h3 className="tp-testimonial-user-3-title">
                              {item?.attributes?.users_permissions_user?.data.attributes?.company_profile?.data.attributes?.companyName || item?.attributes?.users_permissions_user?.data.attributes?.user_profile?.data.attributes?.first_name || "Company Needs"} /
                            </h3>
                            <span>
                              {dayjs(item?.attributes?.publishedAt).format("MMMM D, YYYY")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="tp-testimoinal-slider-dot-3 tp-swiper-dot-border text-center mt-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
