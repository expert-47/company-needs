import Link from "next/link";
import React from "react";
import ForgotForm from "../forms/forgot-form";
import LoginShapes from "./login-shapes";
import ForgetPasswordComp from "./forget-password";
import { useTranslations } from "next-intl";

const ForgotArea = () => {
  const t = useTranslations("header");
  return (
    <section className="tp-login-area pb-100 pt-100 p-relative z-index-1 fix">
      <LoginShapes />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="tp-login-wrapper">
              <div className="tp-login-option">
                <ForgetPasswordComp />
                <div className="d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <span>
                      {t("Remeber Password")}?{" "}
                      <Link href="/login" className="text-primary">
                        {" "}
                        {t("Login")}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotArea;
