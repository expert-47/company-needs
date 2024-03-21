/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { VERIFY_OTP, RESEND_OTP, LOGIN_USER } from "@/graphql/mutation/auth";
import { setCookie } from "cookies-next";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/features/auth/authSlice";

let userNotConfirmed = true;   /// This is not proper solution! 
const OtpVerification = ({ email, userData, isLogin, password }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const [allDigitsEntered, setAllDigitsEntered] = useState(false);
  const [verifyOtp] = useMutation(VERIFY_OTP);
  const [resendOtp] = useMutation(RESEND_OTP);
  const [loginMutation] = useMutation(LOGIN_USER);
  const handleChange = (index, value) => {
    if (value.match(/^[0-9]{0,1}$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      const allDigitsEntered = newOtp.every((digit) => digit !== "");
      setAllDigitsEntered(allDigitsEntered);
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const getUserDetailByLogin = async () => {
    try {
      const response = await loginMutation({
        variables: {
          input: {
            identifier: email,
            password: password,
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
      }
    } catch (error) {
      notifyError(error?.message || "Something went wrong during login.");
    }
  }
  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    try {
      const verifyOtpResponse = await verifyOtp({
        variables: {
          input: {
            otp: Number(enteredOtp),
            email: email,
          },
        },
      });

      const { status, message } = verifyOtpResponse.data.verifyOtp;
      if (status === true) {
        if (isLogin) {
          getUserDetailByLogin()
        }
        else {
          setCookie("token", userData.jwt);
          setCookie("userInfo", JSON.stringify(userData));
          dispatch(
            userLoggedIn({
              accessToken: userData.jwt,
              user: userData,
              isAuthenticated: true,
            })
          );
          notifySuccess("User Registered Successfully!");
          router.push("/");
        }
      } else {
        notifyError(message);
      }
    } catch (error) {
      notifyError(
        error?.message || "Error occurred during OTP verification"
      );
    }
    setOtp(["", "", "", ""]);
    setAllDigitsEntered(false);
  };

  const handleResend = async () => {
    try {
      const resendOtpResponse = await resendOtp({
        variables: {
          input: {
            email: email,
          },
        },
      });
      const { status, message } = resendOtpResponse.data.resendOtp;
      if (status === true) {
        notifySuccess("OTP resend Successfully!");
      } else {
        notifyError(
          error?.message || "Error occurred while resending OTP."
        );
      }
    } catch (error) {
      notifyError(error?.message || "Error occurred while resending OTP.");
    }
  };

  useEffect(() => {
    if (isLogin && userNotConfirmed) {
      userNotConfirmed = false
      handleResend()
    }
  }, [])
  const t = useTranslations("header");
  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-md-5">
        <h3 className="text-center mb-4">{t("Enter 4 digit code")}</h3>
        <div className="mb-4">
          <label
            htmlFor="otpInput"
            className="form-label text-center pt-5 lh-1"
          >
            {t("Enter the 4-digit Code that you received on your email")}
          </label>
          <div className="d-flex justify-content-center" style={{ direction: "ltr" }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                className="form-control otp-input p-2 mx-md-2 text-center text-dark bg-light shadow-none"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyUp={(e) => handleKeyPress(e, index)}
                maxLength="1"
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-center pt-5">
          <button
            type="button"
            className="btn btn-lg btn-primary form-control shadow-none bg-primary text-white rounded-1"
            onClick={handleSubmit}
            disabled={!allDigitsEntered}
          >
            {t("Verify")}
          </button>
        </div>
        <div className="d-flex justify-content-center pt-3">
          <button type="button" className="text-primary" onClick={handleResend}>
            {t("Resend OTP")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
