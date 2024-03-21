import React, { useState, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { VERIFY_OTP, RESEND_OTP } from "@/graphql/mutation/auth";
import RegeneratePassword from "./renew-password";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";

const PasswordVerification = ({ email }) => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const inputRefs = useRef([]);
  const [allDigitsEntered, setAllDigitsEntered] = useState(false);
  const [verifyOtp] = useMutation(VERIFY_OTP);
  const [resendOtp] = useMutation(RESEND_OTP);
  const [enteredOtp, setEnteredOtp] = useState("");
  const t = useTranslations("header");
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
        notifySuccess(message);
        setIsOtpVerified(true);
        setEnteredOtp(enteredOtp);
      } else {
        notifyError(message);
      }
    } catch (error) {
      notifyError(
        error?.message || "Something went wrong with OTP."
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
        setEnteredOtp(enteredOtp);
      } else {
        notifyError(
          error?.message || "Error occurred while resending OTP."
        );
      }
      notifySuccess("OTP has been re-sent to your email");
    } catch (error) {
      console.error("OTP resend error", error);
      notifyError(
        error?.message || "Error occurred while resending OTP."
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 px-md-5">
        {isOtpVerified ? (
          <RegeneratePassword email={email} otp={enteredOtp} />
        ) : (
          <>
            <h3 className="text-center">{t("Enter 4 digit code")}</h3>
            <div className="mb-4">
              <label
                htmlFor="otpInput"
                className="form-label text-center pt-md-5 pt-2 lh-1"
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
            <div className="d-flex justify-content-center pt-md-3 pt-2">
              <button
                type="button"
                className="text-primary"
                onClick={handleResend}
              >
                {t("Resend OTP")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordVerification;
