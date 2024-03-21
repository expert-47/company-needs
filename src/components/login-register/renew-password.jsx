import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CloseEye, OpenEye } from "@/svg";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";
import { CREATE_NEW_PASSWORD } from "@/graphql/mutation/auth";
import * as Yup from "yup"; // Import Yup
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";

const schema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New Password is required")
    .label("New Password")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Minimum length of 8 characters. Must contain at least one uppercase letter one lowercase letter one digit and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords does not match")
    .required("Confirm Password is required")
    .label("Confirm Password"),
});

const RegeneratePassword = ({ email, otp }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const [showNewPass, setShowNewPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const [createNewPassword, { loading, error }] =
    useMutation(CREATE_NEW_PASSWORD);

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      const response = await createNewPassword({
        variables: {
          input: {
            ...data,
            email,
            otp,
          },
        },
      });
      const { status, message } = response.data.newPassword;
      if (status === true) {
        notifySuccess(message);
        router.push("/login");
      } else {
        console.error("Password change failed.");
        notifyError(message);
      }
    } catch (error) {
      console.error("Password change error", error);
    }
  };
  const t = useTranslations("header");
  return (
    <div>
      <div className="col-12">
        <h3 className="text-center fs-2 mb-4">{t("Create New Password")}</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label fw-semibold">
              {t("New Password")} <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type={showNewPass ? "text" : "password"}
                className={`form-control shadow-none ${errors.newPassword ? "is-invalid" : ""
                  }`}
                id="newPassword"
                name="newPassword"
                {...register("newPassword")}
              />
              <div className="tp-login-input-eye" id="new-password-show-toggle">
                <span
                  className="eye-icon"
                  onClick={() => setShowNewPass(!showNewPass)}
                >
                  {showNewPass ? <OpenEye /> : <CloseEye />}
                </span>
              </div>
            </div>
            {errors.newPassword && (
              <div className="text-danger">{errors.newPassword.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-semibold">
              {t("Confirm Password")} <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                className={`form-control shadow-none ${errors.confirmPassword ? "is-invalid" : ""
                  }`}
                id="confirmPassword"
                name="confirmPassword"
                {...register("confirmPassword")}
              />
              <div
                className="tp-login-input-eye"
                id="confirm-password-show-toggle"
              >
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <OpenEye /> : <CloseEye />}
                </span>
              </div>
            </div>
            {errors.confirmPassword && (
              <div className="text-danger">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary form-control shadow-none bg-primary text-white mt-md-4 mt-2"
            disabled={loading}
          >
            {loading ? (
              <span>{t("loading")}...</span>
            ) : (
              <span>{t("Submit")}</span>
            )}
          </button>
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              An error occurred. Please try again later.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegeneratePassword;
