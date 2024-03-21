import React, { useRef, useEffect } from "react";
import ReviewForm from "../forms/review-form";
import ReviewItem from "./review-item";
import { useTranslations } from "next-intl";
import { getLanguageBasedValue } from "@/lib/get-language";
import { useRouter } from "next/router";

const DetailsTabNav = ({ product, productReviews }) => {
  const reviwProductId = product[0]?.id || "";
  const reviews = productReviews || "";
  const activeRef = useRef(null);
  const marker = useRef(null);
  const route = useRouter();
  const t = useTranslations("header");
  const handleActive = (e) => {
    if (e.target.classList.contains("active")) {
      marker.current.style.left = e.target.offsetLeft + "px";
      marker.current.style.width = e.target.offsetWidth + "px";
    }
  };
  useEffect(() => {
    if (activeRef.current?.classList.contains("active")) {
      marker.current.style.left = activeRef.current.offsetLeft + "px";
      marker.current.style.width = activeRef.current.offsetWidth + "px";
    }
  }, []);
  // nav item

  function NavItem({ active = false, id, title, linkRef }) {
    return (
      <button
        ref={linkRef}
        className={`nav-link ${active ? "active" : ""}`}
        id={`nav-${id}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#nav-${id}`}
        type="button"
        role="tab"
        aria-controls={`nav-${id}`}
        aria-selected={active ? "true" : "false"}
        tabIndex="-1"
        onClick={(e) => handleActive(e)}
      >
        {title}
      </button>
    );
  }

  return (
    <>
      <div className="tp-product-details-tab-nav tp-tab">
        <nav>
          <div
            className="nav nav-tabs d-flex justify-content-around p-relative tp-product-tab"
            id="navPresentationTab"
            role="tablist"
          >
            <NavItem
              active={true}
              linkRef={activeRef}
              id="desc"
              title={t("Description")}
            />
            {/* <NavItem id="additional" title={t("Additional information")} /> */}
            <NavItem
              id="review"
              title={t("Reviews")}
              {...`${reviews?.length}`}
            />
            <span
              ref={marker}
              id="productTabMarker"
              className="tp-product-details-tab-line"
            ></span>
          </div>
        </nav>
        <div className="tab-content" id="navPresentationTabContent">
          {/* nav-desc */}
          <div
            className="tab-pane fade show active"
            id="nav-desc"
            role="tabpanel"
            aria-labelledby="nav-desc-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-desc-wrapper pt-50">
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-product-details-desc-item">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <div className="tp-product-details-desc-content">
                          {product[0]?.attributes?.description?.length > 0 ? (
                            <p>
                              {getLanguageBasedValue(
                                product[0]?.attributes,
                                "description",
                                "",
                                route.locale
                              )}
                            </p>
                          ) : (
                            <p>{t("No Description")}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* addInfo */}
          {/* <div
            className="tab-pane fade"
            id="nav-additional"
            role="tabpanel"
            aria-labelledby="nav-additional-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-additional-info ">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  {product.length < 0 ? (
                    <table>
                      <tbody>
                        {product?.map((item, i) => (
                          <tr key={i}>
                            <td>{item.key}</td>
                            <td>{item?.attributes?.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    "No Additional Information"
                  )}
                </div>
              </div>
            </div>
          </div> */}
          {/* Review */}
          <div
            className="tab-pane fade"
            id="nav-review"
            role="tabpanel"
            aria-labelledby="nav-review-tab"
            tabIndex="-1"
          >
            <div className="tp-product-details-review-wrapper pt-50">
              <p>{t("There are no reviews yet")}</p>
              {/* <div className="row">
                <div className="col-lg-6">
                  <div className="tp-product-details-review-statics">
                    <div className="tp-product-details-review-list pr-110">
                      <h3 className="tp-product-details-review-title">
                        {t("Rating & Review")}
                      </h3>
                      {reviews?.length === 0 && (
                        <h3 className="tp-product-details-review-title">
                          {t("There are no reviews yet")}
                        </h3>
                      )}
                      {reviews?.length > 0 &&
                        reviews?.map((item) => (
                          <ReviewItem key={item?.id} review={item} />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tp-product-details-review-form">
                    <h3 className="tp-product-details-review-form-title">
                      {t("Review this product")}
                    </h3>
                    <p>
                      {t("Your email address will not be published")}
                    </p>
                    <ReviewForm product_id={reviwProductId} />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsTabNav;
