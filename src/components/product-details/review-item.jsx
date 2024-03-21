import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const ReviewItem = ({ review }) => {
  const [textMore, setTextMore] = useState(false);
  const t = useTranslations("header");
  const { text, publishedAt, ratings, userId } = review?.attributes || {};
  const userName = review?.attributes?.users_permissions_user?.data?.attributes?.
    company_profile?.data?.attributes?.companyName || review?.attributes?.users_permissions_user?.data?.attributes?.
      user_profile?.data?.attributes?.first_name || ""
  return (
    <div className="tp-product-details-review-avater d-flex align-items-start">
      <div className="tp-product-details-review-avater-thumb">
        {userName ? (
          <h5 className="review-name text-uppercase">{userName[0] + userName[1]}</h5>
        ) : (
          <h5 className="review-name text-uppercase">CN</h5>
        )}
      </div>
      <div className="tp-product-details-review-avater-content">
        <h3 className="tp-product-details-review-avater-title">
          {userName || "Company Needs"}
        </h3>
        <div className="tp-product-details-review-avater-rating d-flex align-items-center">
          <Rating
            size={16}
            initialValue={ratings}
            readonly={true}
          />
        </div>
        <span className="tp-product-details-review-avater-meta">
          {dayjs(publishedAt).format("MMMM D, YYYY")}
        </span>
        <div className="tp-product-details-review-avater-comment">
          {text?.length > 0 ? (
            <p >
              {textMore
                ? text
                : `${text?.substring(0, 50)}`}{" "}
              <span className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setTextMore(!textMore)}
                hidden={text.length < 50}
              >
                {" "}  {textMore ? t("See Less") : t("See More")}
              </span>
            </p>
          ) : (
            <p>{t("No Description")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
