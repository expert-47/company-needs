/** @format */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, gql } from "@apollo/client";
import PasswordVerification from "./password-verification";
import { FORGET_PASSWORD } from "@/graphql/mutation/auth";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
});

const ForgetPasswordComp = () => {
  const t = useTranslations("header");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [forgotPassword, { loading, error }] = useMutation(FORGET_PASSWORD);
  const onSubmit = async (data) => {
    try {
      const { data: forgotPasswordData } = await forgotPassword({
        variables: { email: data.email },
      });
      if (
        forgotPasswordData &&
        forgotPasswordData.forgotPassword &&
        forgotPasswordData.forgotPassword.status === true
      ) {
        setEmail(data.email);
        notifySuccess(forgotPasswordData.forgotPassword.message);
        setIsCodeSent(true);
      } else {
        notifyError(forgotPasswordData.forgotPassword.message);
      }
    } catch (error) {
      console.error("Forgot Password error", error);
      notifyError(error.message);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
        {isCodeSent ? (
          <>
            <PasswordVerification email={email} />
          </>
        ) : (
          <>
            <h3 className="text-center fs-2 mb-4">{t("Reset Password")}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 text-start">
                <label htmlFor="email" className="form-label fw-semibold">
                  {t("Enter your Email")} <span className="text-danger">*</span>
                </label>
                <div className="d-flex justify-content-center">
                  <input
                    type="email"
                    className={`form-control shadow-none ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder={t("Enter Your Email")}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <div className="text-danger text-start">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center pt-5">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary form-control bg-primary text-white shadow-none rounded-1"
                  disabled={loading}
                >
                  {loading ? t("loading") + "..." : t("Continue")}
                </button>
              </div>
            </form>
            {/* {error && (
              <div className="text-danger text-center mt-3">
                Please Enter the Valid Email
              </div>
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordComp;
