import React, { useState } from "react";
import LoginShapes from "./login-shapes";
import GoogleSignUp from "./google-sign-up";
import RegisterFormIndividual from "../forms/register-form-individual";
import RegisterFormComapany from "../forms/register-form-company";
import { useTranslations } from "next-intl";

const RegisterArea = () => {
  const [formType, setFormType] = useState("company");
  const t = useTranslations("header");
  return (
    <>
      <section className="tp-login-area pb-100 pt-100 p-relative z-index-1 fix">
        <LoginShapes />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="tp-login-wrapper rounded-3">
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title fw-bolder">{t("Sign Up")}</h3>
                </div>
                <div className="tp-login-option">
                  {/*<div className="tp-login-social mb-10 d-flex flex-wrap align-items-center justify-content-center">
                    <div className="tp-login-option-item has-google">
                      <GoogleSignUp title="title" />
                    </div>
                  </div>
                  <div className="tp-login-mail text-center mb-40">
                    <p>{t("or Sign up with Email")}</p>
                  </div>
                  <div className="d-flex justify-content-center  align-items-center my-2">
                    <div className="form-check ms-md-4 ms-3">
                    <div className="form-check me-md-4 me-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        checked={formType === "company"}
                        onChange={() => setFormType("company")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        {t("Company")}
                      </label>
                    </div>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked={formType === "user"}
                        onChange={() => setFormType("user")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        {t("Individual")}
                      </label>
                    </div> 
                  </div>
                  {formType === "user" ? (
                    <RegisterFormIndividual formType={formType} />
                  ) : ( )}*/}
                  <RegisterFormComapany formType={formType} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterArea;
