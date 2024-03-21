import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorMsg from "../common/error-msg";
import { useMutation } from "@apollo/client";
import { CHANGED_PASSWORD } from "@/graphql/mutation/auth";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { notifyError, notifySuccess } from "@/utils/toast";

const schema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Old Password is required")
    .label("Old Password"),
  password: Yup.string()
    .when(["currentPassword"], (currentPassword, schema) => {
      return currentPassword && currentPassword.length > 0
        ? schema
            .notOneOf(
              [Yup.ref("currentPassword")],
              "New Password must be different"
            )
            .required("New Password is required")
        : schema.required("New Password is required");
    })

    .label("New Password")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Minimum length of 8 characters. Must contain at least one uppercase letter one lowercase letter one digit and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords does not match")
    .required("Confirm Password is required")
    .label("Confirm Password"),
});

// schemaTwo
const schemaTwo = Yup.object().shape({
  newPassword: Yup.string().required().min(8).label("New Password"),
  confirmPassword: Yup.string()
    .min(8)
    .oneOf([Yup.ref("newPassword"), null], "Passwords does not match"),
});

const ChangePassword = () => {
  const t = useTranslations("header");
  const { user } = useSelector((state) => state.auth);
  const [changePassword, { loading }] = useMutation(CHANGED_PASSWORD);
  const token = getCookie("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(user?.googleSignIn ? schemaTwo : schema),
  });

  const onSubmit = async (data) => {
    try {
      let response = await changePassword({
        variables: {
          currentPassword: data?.currentPassword,
          password: data?.password,
          passwordConfirmation: data?.confirmPassword,
          id: user?.id,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (response) {
        notifySuccess("Password Changed Successfully!");
      }
      reset();
    } catch (error) {
      console.error("Error while sending the message:", error);
      notifyError("You entered a wrong old password!");
    }
  };

  return (
    <div className="profile__password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {!user?.googleSignIn && (
            <div className="col-xxl-12">
              <div className="tp-profile-input-box">
                <div className="tp-contact-input">
                  <input
                    {...register("currentPassword")}
                    name="currentPassword"
                    id="currentPassword"
                    type="password"
                  />
                </div>
                <div className="tp-profile-input-title">
                  <label htmlFor="currentPassword">{t("Old Password")}</label>
                </div>
                <ErrorMsg msg={errors.currentPassword?.message} />
              </div>
            </div>
          )}
          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="tp-profile-input">
                <input
                  {...register("password")}
                  name="password"
                  id="password"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="password">{t("New Password")}</label>
              </div>
              <ErrorMsg msg={errors.password?.message} />
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="tp-profile-input">
                <input
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="confirmPassword">{t("Confirm Password")}</label>
              </div>
              <ErrorMsg msg={errors.confirmPassword?.message} />
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="profile__btn">
              <button type="submit" className="tp-btn">
                {loading ? t("loading") + "..." : t("Update")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
