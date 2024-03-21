/** @format */

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import * as Yup from "yup";
// internal
import ErrorMsg from "../common/error-msg";
import { useAddReviewMutation } from "@/redux/features/reviewApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client";
import { REVIEWS } from "@/graphql/mutation/reviews";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";


// schema
const schema = Yup.object().shape({
  // name: Yup.string().required().label("Name"),
  // email: Yup.string()
  //   .required()
  //   .email()
  //   .label("Email")
  //   .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
  comment: Yup.string().required().label("Comment"),
});

const ReviewForm = ({ product_id, onConfirm }) => {
  const [createReview, { loading, error }] = useMutation(REVIEWS);
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(1);
  const [addReview, { }] = useAddReviewMutation();
  const t = useTranslations("header");
  const token = getCookie("token");

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  // on submit
  const onSubmit = async (data) => {
    try {
      if (!user) {
        notifyError("Please login to review!");
        router.push("/login")
      } else {
        await createReview({
          variables: {
            data: {
              ratings: rating,
              text: data.comment,
              product: product_id,
              users_permissions_user: user?.id,
              publishedAt: new Date(),
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        });
        notifySuccess("Review submit successfully!");
        reset();
        setRating(1);
        onConfirm()
      }
    } catch (error) {
      // notifyError("Failed to submit review");
      console.log("Failed to submit review", error)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-product-details-review-form-rating d-flex align-items-center">
        <p><strong>{t("Your Rating")} </strong></p>
        <div className="tp-product-details-review-form-rating-icon d-flex align-items-center">
          <Rating
            onClick={handleRating}
            size={16}
            initialValue={rating}
          />
        </div>
      </div>
      <div className="tp-product-details-review-input-wrapper">
        <div className="tp-product-details-review-input-box">
          <div className="tp-product-details-review-input">
            <textarea
              {...register("comment", { required: `Comment is required!` })}
              id="comment"
              name="comment"
              placeholder={t("Write your review here")}
            />
          </div>
          <div className="tp-product-details-review-input-title">
            <label htmlFor="msg">{t("Your Review")}</label>
          </div>
          <ErrorMsg msg={errors?.comment?.message} />
        </div>
        {/* <div className="tp-product-details-review-input-box">
          <div className="tp-product-details-review-input">
            <input
              {...register("name", { required: `Name is required!` })}
              name="name"
              id="name"
              type="text"
              placeholder={t("Enter your Name")}
            />
          </div>
          <div className="tp-product-details-review-input-title">
            <label htmlFor="name">{t("Your Name")}</label>
          </div>
          <ErrorMsg msg={errors?.name?.message} />
        </div>
        <div className="tp-product-details-review-input-box">
          <div className="tp-product-details-review-input">
            <input
              {...register("email", { required: `Name is required!` })}
              name="email"
              id="email"
              type="email"
              placeholder={t("Enter your Email")}
            />
          </div>
          <div className="tp-product-details-review-input-title">
            <label htmlFor="email">{t("Your Email")}</label>
          </div>
          <ErrorMsg msg={errors?.email?.message} />
        </div> */}
      </div>
      <div className="tp-product-details-review-btn-wrapper mt-20">
        <button type="submit" className="tp-product-details-review-btn">
          {t("Submit")}
        </button>
      </div>
    </form>

  );
};

export default ReviewForm;
