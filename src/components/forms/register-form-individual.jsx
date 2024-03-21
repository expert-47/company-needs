import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "@/graphql/mutation/auth";
import { useRouter } from "next/router";
import { CloseEye, OpenEye } from "@/svg";
import OtpVerification from "../login-register/otp-verify";
import { useTranslations } from "next-intl";
import "react-intl-tel-input/dist/main.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { notifyError, notifySuccess } from "@/utils/toast";
import { getCookies, setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

const schema = yup.object().shape({
  phone: yup.string().required("Phone is required").label("Phone").min(10),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Minimum length of 8 characters. Must contain at least one uppercase letter one lowercase letter one digit and one special character"
    ),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password"), null], "Passwords does not match")
    .required("Confirm Password is required"),
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
});

const RegisterFormIndividual = ({ formType }) => {
  const t = useTranslations("header");
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const dispatch = useDispatch();
  const googleUserToken = getCookies("id_token");
  const encodedEmail = getCookies("google_email");
  const decodedEmail = decodeURIComponent(encodedEmail?.google_email);
  const [email, setEmail] = useState(decodedEmail || "");
  const [userData, setUserData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [registerUser, { loading, error }] = useMutation(SIGNUP_USER);
  const [phone, setPhone] = useState("");
  const [leble, setLeble] = useState("");
  const onSubmit = async (data) => {
    const phoneNumber = data.phone;
    const splitPhone = phoneNumber.split(" ");
    const firstPart = splitPhone[0].replace(/[^\d]/g, "");
    const lastPart = splitPhone[1].replace(/[^\d]/g, "");
    const lebleUpperCase = leble.toUpperCase();
    try {
      let response;
      {
        decodedEmail
          ? (response = await registerUser({
              variables: {
                input: {
                  type: formType,
                  email: data.email || decodedEmail,
                  first_name: data.first_name,
                  last_name: data.last_name,
                  calling_code: firstPart,
                  country_code: lebleUpperCase,
                  phoneNumber: lastPart,
                  password: data.password,
                  confirmPassword: data.confirmPassword,
                  username: data.email,
                  googleToken: googleUserToken?.id_token || "",
                },
              },
            }))
          : (response = await registerUser({
              variables: {
                input: {
                  type: formType,
                  email: data.email,
                  first_name: data.first_name,
                  last_name: data.last_name,
                  calling_code: firstPart,
                  country_code: lebleUpperCase,
                  phoneNumber: lastPart,
                  password: data.password,
                  confirmPassword: data.confirmPassword,
                  username: data.email,
                },
              },
            }));
      }
      const SuccessResponse = response?.data?.register?.user?.confirmed;

      if (SuccessResponse === true) {
        const { jwt, user, company_profile, user_profile } =
          response?.data?.register;
        let userData = {
          ...user,
          name: company_profile
            ? company_profile.companyName
            : user_profile.first_name,
          profile_image: user_profile
            ? user_profile.profile_image
            : company_profile.profile_image,
          company_profile: company_profile,
          user_profile: user_profile,
          jwt,
          formType,
          phoneNumber,
        };
        setUserData(userData);
        setEmail(data?.email);
        setCookie("token", jwt);
        setCookie("userInfo", JSON.stringify(userData));
        dispatch(
          userLoggedIn({
            accessToken: jwt,
            user: userData,
            isAuthenticated: true,
          })
        );
        router.push("/");
        notifySuccess("User Registered Successfully!");
      } else if (SuccessResponse === false) {
        const { jwt, user, company_profile, user_profile } =
          response?.data?.register;
        let userData = {
          ...user,
          name: company_profile
            ? company_profile.companyName
            : user_profile.first_name,
          profile_image: user_profile
            ? user_profile.profile_image
            : company_profile.profile_image,
          company_profile: company_profile,
          user_profile: user_profile,
          jwt,
          formType,
          phoneNumber,
        };
        setUserData(userData);
        setEmail(data?.email);
        setRegistrationSuccess(true);
      }
    } catch (error) {
      notifyError(
        error?.message || "Something went wrong during Registration."
      );
    }
  };

  return (
    <div>
      {registrationSuccess ? (
        <OtpVerification email={email} userData={userData} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-md-3 mb-2">
            <div className="col-md-6 mb-3">
              <label
                htmlFor="first_name"
                className="form-label text-black fw-semibold p-0 m-0"
              >
                {t("First Name")} <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className={`form-control border-0 bg-light shadow-none ${
                  errors.first_name ? "is-invalid" : ""
                }`}
                id="first_name"
                placeholder={t("Enter your first name")}
                aria-describedby="first_nameHelp"
                name="first_name"
                {...register("first_name")}
                onChangeCapture={(e) => {
                  setValue(
                    "first_name",
                    e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
                  );
                }}
              />
              {errors.first_name && (
                <div className="invalid-feedback">
                  {errors.first_name.message}
                </div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label
                htmlFor="last_name"
                className="form-label text-black fw-semibold p-0 m-0"
              >
                {t("Last Name")} <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className={`form-control border-0 bg-light shadow-none ${
                  errors.last_name ? "is-invalid" : ""
                }`}
                id="last_name"
                placeholder={t("Enter your last name")}
                aria-describedby="last_nameHelp"
                name="last_name"
                {...register("last_name")}
                onChangeCapture={(e) => {
                  setValue(
                    "last_name",
                    e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
                  );
                }}
              />
              {errors.last_name && (
                <div className="invalid-feedback">
                  {errors.last_name.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="email"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Email")} <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className={`form-control border-0 bg-light shadow-none ${
                errors.email ? "is-invalid" : ""
              }`}
              id="email"
              placeholder={t("Enter your Email")}
              aria-describedby="emailHelp"
              // defaultValue={email || ""}
              name="email"
              {...register("email")}
              onChangeCapture={(e) => {
                setValue(
                  "email",
                  e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
                );
              }}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="phone"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Phone")} <span className="text-danger">*</span>
            </label>
            <PhoneInput
              name="phone"
              id="phone"
              style={{
                "--react-international-phone-border-radius": 0,
                "--react-international-phone-border-color": "none",
                "--react-international-phone-dropdown-item-background-color":
                  "white",
                "--react-international-phone-background-color": "transparent",
                "--react-international-phone-text-color": "black",
                "--react-international-phone-selected-dropdown-item-background-color":
                  "transparent",
                "--react-international-phone-selected-dropdown-zindex": "1",
                "--react-international-phone-height": "50px",
              }}
              className={`form-control border-0 bg-light p-1 ${
                errors.phone ? "is-invalid" : ""
              }`}
              defaultCountry="sa"
              forceDialCode={true}
              placeholder={t("Enter your phone here")}
              value={phone}
              onChange={(phone, labels) => {
                setPhone(phone);
                setLeble(labels);
                setValue("phone", phone);
              }}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone.message}</div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="password"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Password")} <span style={{ color: "red" }}>*</span>
            </label>
            <div className="position-relative">
              <input
                type={showPass ? "text" : "password"}
                className={`form-control border-0 bg-light shadow-none ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder={t("Enter your password here")}
                aria-describedby="passwordHelp"
                name="password"
                {...register("password")}
                onChangeCapture={(e) => {
                  setValue(
                    "password",
                    e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
                  );
                }}
              />
              <div className="tp-login-input-eye" id="password-show-toggle">
                <span
                  className="eye-icon"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <OpenEye /> : <CloseEye />}
                </span>
              </div>
            </div>
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="confirmPassword"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Confirm Password")} <span style={{ color: "red" }}>*</span>
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                className={`form-control border-0 bg-light shadow-none ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                placeholder={t("Confirm Password")}
                aria-describedby="confirmPasswordHelp"
                name="confirmPassword"
                {...register("confirmPassword")}
                onChangeCapture={(e) => {
                  setValue(
                    "confirmPassword",
                    e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
                  );
                }}
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
              <span className="text-danger">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center ">
            <button
              type="submit"
              className="btn btn-primary form-control py-md-3 py-2 my-3 shadow-none bg-primary text-white"
            >
              {loading ? (
                <span>{t("loading")}...</span>
              ) : (
                <span>{t("Sign Up")}</span>
              )}
            </button>
            <p className="mt-5">
              {t("Already have an account")}?{" "}
              <span className="text-primary">
                <Link href="/login">{t("Sign In")}</Link>
              </span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterFormIndividual;
