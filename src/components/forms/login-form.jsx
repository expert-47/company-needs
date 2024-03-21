import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import * as yup from "yup";
import { setCookie } from "cookies-next";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_USER } from "@/graphql/mutation/auth";
import { CloseEye, OpenEye } from "@/svg";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { notifyError, notifySuccess } from "@/utils/toast";
import OtpVerification from "../login-register/otp-verify";

const LoginForm = () => {
  const t = useTranslations("header");
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [loginMutation, { loading, error }] = useMutation(LOGIN_USER);
  const schema = yup.object().shape({
    email: yup
      .string()
      .label("Password")
      .required("Email is required")
      .email("Invalid email address")
      .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
    password: yup.string().label("Password").required("Password is required"),
  });
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }, getValues
  } = useForm({ mode: "all", resolver: yupResolver(schema) });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (data, e) => {
    if (e.key === "Enter") {
      setFormData(formData);
    }
    try {
      const response = await loginMutation({
        variables: {
          input: {
            identifier: data.email,
            password: data.password,
          },
        },
      });
      const confirmedUser = response?.data?.login?.user?.confirmed
      if (confirmedUser === true) {
        const { jwt, user, company_profile, user_profile } = response?.data?.login;
        let userData = {
          ...user,
          name: company_profile ? company_profile?.companyName : user_profile?.first_name,
          profile_image: user_profile ? user_profile?.profile_image : company_profile?.profile_image,
          company_profile: company_profile,
          user_profile: user_profile,
          formType: user?.type
        };

        setCookie("token", jwt);
        setCookie("userInfo", JSON.stringify(userData));
        dispatch(
          userLoggedIn({
            accessToken: jwt,
            user: userData,
            isAuthenticated: true,
          })
        );
        notifySuccess("Successfully LoggedIn!");
        router.push("/");
      } else {
        notifyError(`Please confirm your email first`)
      }
    } catch (error) {
      if (error?.message?.includes("confirmed") || error?.message?.includes("disabled")) {
        notifyError(`Please confirm your email first`)
        setRegistrationSuccess(true)
      } else
        notifyError(error?.message || "Something went wrong during login.");
    }
  };
  return (
    <>
      {registrationSuccess ?
        (<OtpVerification email={email || getValues()?.email} userData={userData} isLogin={true} password={getValues()?.password} />) : (
          <div className="container my-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-md-3 mb-2">
                <label
                  htmlFor="email"
                  className="form-label text-black fw-semibold p-0 m-0"
                >
                  {t("Email")} <span className="text-danger">*</span>
                </label>
                <input
                  {...register("email")}
                  name="email"
                  id="email"
                  type="email"
                  className={`form-control border-0 bg-light shadow-none ${errors.email ? "is-invalid" : ""
                    }`}
                  placeholder={t("Enter your Email")}
                  aria-describedby="UsernameHelp"
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="invalid-feedback">{errors.email.message}</span>
                )}
              </div>
              <div className="mb-md-3 mb-2">
                <label
                  htmlFor="password"
                  className="form-label text-black fw-semibold p-0 m-0"
                >
                  {t("Password")} <span className="text-danger">*</span>
                </label>
                <div className="position-relative">
                  <input
                    {...register("password")}
                    name="password"
                    id="password"
                    type={showPass ? "text" : "password"}
                    className={`form-control border-0 bg-light shadow-none ${errors.password ? "is-invalid" : ""
                      }`}
                    placeholder={t("Enter your password here")}
                    aria-describedby="PasswordHelp"
                    onChange={handleChange}
                    onChangeCapture={(e) => {
                      setValue(
                        "password",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .trimEnd()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  <div className="tp-login-input-eye" id="password-show-toggle">
                    <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                      {showPass ? <OpenEye /> : <CloseEye />}
                    </span>
                  </div>
                </div>
                {errors.password && (
                  <span className="text-danger">{errors.password.message}</span>
                )}
              </div>
              <div className="text-primary">
                <Link href="/forgot">{t("Forget Password")}?</Link>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <button
                  type="submit"
                  onKeyDown={(e) => onSubmit(e)}
                  className="btn btn-primary form-control py-md-3 py-2 my-3 shadow-none bg-primary text-white"
                >
                  {loading ? (
                    <span>{t("loading")}...</span>
                  ) : (
                    <span>{t("Sign In")}</span>
                  )}
                </button>
                <p className="mt-5">
                  {t("Dont have an account")}?{" "}
                  <span>
                    <Link
                      href="/register"
                      className="btn text-primary border-0 shadow-none ps-1"
                    >
                      {t("Sign Up")}
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        )}</>

  );
};

export default LoginForm;
