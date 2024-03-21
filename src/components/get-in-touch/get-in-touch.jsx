import { Email, Phone } from "@/svg";
import Image from "next/image";
import React, { useState } from "react";
import googlePlayBadge from "../../../public/assets/img/googlePlayBadge.png";
import Link from "next/link";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { CONTACT_US } from "@/graphql/mutation/contact";
import { notifyError, notifySuccess } from "@/utils/toast";

const GetInTouch = () => {
  const t = useTranslations("header");
  const schema = Yup.object().shape({
    name: Yup.string().required(t("Name is required")),
    email: Yup.string()
      .required(t("Email is required"))
      .email(t("Invalid email"))
      .matches(/^\S+@\S+\.\S{2,}$/i, t("Invalid Email Format")),
    phone: Yup.string()
      .required(t("Phone is required"))
      .matches(/^[+\d\s-]+$/, t("Invalid Phone Number"))
      .min(10, t("Phone number must be at least 10 characters")),
    message: Yup.string().required(t("Message is required")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [createContact, { loading, error }] = useMutation(CONTACT_US);
  const [phone, setPhone] = useState("");

  const onSubmit = async (data) => {
    const phoneNumber = data.phone;
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
    try {
      await createContact({
        variables: {
          data: {
            name: data.name,
            email: data.email,
            phoneNumber: cleanedPhoneNumber,
            message: data.message,
          },
        },
      });
      notifySuccess("Message sent successfully!");
      setPhone("");
      reset();
    } catch (error) {
      console.error("Error while sending the message:", error);
      notifyError("Failed to sent Message");
    }
  };

  console.log("errors", Object.keys(errors).length > 0);

  return (
    <div className="about-us-bg-image overflowXbgImage pt-40" id="get-in-touch">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 borderRightTouch">
            {/* <div className="container paddingLeftTouch"> */}
            <p
              className="textHeadingsColor mb-30"
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              {t("Directions")}
            </p>
            <div className="mt-10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.8860628165776!2d46.6316342!3d24.799354700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee3820bfe1fc5%3A0xfcf7d75c54c2094c!2s6531%20Olaya%20St%2C%20As%20Sahafah%2C%203059%2C%20StAs%2013321%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1700481643484!5m2!1sen!2s"
                width="100%"
                height="320"
                style={{ border: "0px" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="d-flex changeColorOnHover clearAllCursor ">
              <div className="mr-5 ml-5">
                <Phone color={"#1c8cfc"} />
              </div>
              <p>
                <Link href="tel:402-763-282-46">+966-11199-8877</Link>
              </p>
            </div>
            <div className="d-flex changeColorOnHover clearAllCursor">
              <div className="mr-5 ml-5">
                <Email color={"#1c8cfc"} />
              </div>
              <p>
                <Link href="mailto:ompanyneeds@support.com">
                  companyneeds@support.com
                </Link>
              </p>
            </div>
            <div className="d-flex flex-column flex-wrap align-items-center flatPropertyLanguageBased">
              <div
                style={{
                  width: 150,
                }}
              >
                <Link
                  href="https://play.google.com/store/apps/details?id=com.companyneeds.app&pcampaignid=web_share"
                  target="_blank"
                >
                  <Image
                    src={googlePlayBadge}
                    alt="image"
                    width={150}
                    height={150}
                    quality={100}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Link>
              </div>

              <div
                style={{
                  width: 130,
                  // marginLeft: 10,
                }}
              >
                <Link target="_blank" href={"https://www.apple.com/app-store/"}>
                  <Image
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="image"
                    width={150}
                    height={150}
                    quality={100}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Link>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="container d-flex flex-column ">
                <p
                  className="textHeadingsColor mb-30 "
                  style={{
                    fontWeight: "bold",
                    fontSize: "25px",
                    width: "100%",
                  }}
                >
                  {t("Get In Touch")}!
                </p>

                <div class="form-outline">
                  <input
                    {...register("name")}
                    type="text"
                    id="form12"
                    style={{ border: "1px solid #1c8cfc " }}
                    className={`form-control  ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    placeholder={t("Enter your Name")}
                    aria-describedby="nameHelp"
                    onChangeCapture={(e) => {
                      setValue(
                        "name",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                  <input
                    {...register("email")}
                    type="email"
                    className={`form-control  ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    style={{ border: "1px solid #1c8cfc " }}
                    id="email"
                    placeholder={t("Enter a valid email address")}
                    aria-describedby="emailHelp"
                    onChangeCapture={(e) => {
                      setValue(
                        "email",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                  <input
                    {...register("phone")}
                    type="tel"
                    name="phone"
                    id="phone"
                    className={`form-control  ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    placeholder={t("Enter a valid phone Number")}
                    style={{ border: "1px solid #1c8cfc " }}
                    onChangeCapture={(e) => {
                      setValue(
                        "phone",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.message}
                    </div>
                  )}
                  <textarea
                    id="message"
                    {...register("message")}
                    className={`form-control  ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    rows={5}
                    placeholder={t("Enter Your Message")}
                    onChangeCapture={(e) => {
                      setValue(
                        "message",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                    style={{ border: "1px solid #1c8cfc", height: "200px" }}
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">
                      {errors.message.message}
                    </div>
                  )}
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error.message}
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    class="btn btn-lg submitButtonDeseign "
                    disabled={Object.keys(errors).length > 0 ? true : false}
                  >
                    {loading ? t("Sending") + "..." : t("Submit")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
