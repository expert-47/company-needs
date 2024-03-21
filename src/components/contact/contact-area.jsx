import React from "react";
import Image from "next/image";
import ContactForm from "../forms/contact-form";
import call_icon from "@assets/img/contact/phone.png";
import mail_icon from "@assets/img/contact/mail.png";
import location_icon from "@assets/img/contact/location.png";
import { useTranslations } from "next-intl";
import useLoadingState from "@/hooks/use-loading";
import SearchPrdLoader from "../loader/search-prd-loader";

const ContactArea = (props) => {
  const t = useTranslations("header");
  const { attributes: { Address, email, phoneNumber } = {} } = props;
  const loading = useLoadingState();
  return (
    <>
      {loading ? (
        <div>
          <SearchPrdLoader />
        </div>
      ) : (
        <section className="tp-contact-area pb-50 pt-50">
          <div className="container">
            <div className="">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tp-contact-wrapper">
                    <h3
                      className="tp-contact-title"
                      style={{ fontSize: "44px" }}
                    >
                      {t("Contact Us")}
                    </h3>
                    <div className="tp-contact-form">
                      <p className="fs-6 py-3">{t("description")}</p>
                      <>
                        <div className="">
                          <a
                            rel="noopener noreferrer"
                            href={`tel:${phoneNumber}`}
                            className="list-group-item list-group-item-action d-flex gap-3 py-3"
                            aria-current="true"
                          >
                            <Image
                              src={call_icon}
                              alt="twbs"
                              className=" flex-shrink-0"
                            />
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div>
                                <h6 className="mb-0 text-primary">UAN</h6>
                                <p className="mb-0 ">{phoneNumber}</p>
                              </div>
                            </div>
                          </a>
                          <a
                            rel="noopener noreferrer"
                            href={`mailto:${email}`}
                            className="list-group-item list-group-item-action d-flex gap-3 py-3"
                            aria-current="true"
                          >
                            <Image
                              src={mail_icon}
                              alt="twbs"
                              className=" flex-shrink-0"
                            />
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div>
                                <h6 className="mb-0 text-primary">
                                  {t("Email")}
                                </h6>
                                <p className="mb-0 ">{email}</p>
                              </div>
                            </div>
                          </a>
                          <a
                            rel="noopener noreferrer"
                            href={`https://www.google.com/maps/place/${encodeURIComponent(
                              Address
                            )}`}
                            target="_blank"
                            className="list-group-item list-group-item-action d-flex gap-3 py-3"
                            aria-current="true"
                          >
                            <Image
                              src={location_icon}
                              alt="twbs"
                              className=" flex-shrink-0"
                            />
                            <div className="d-flex gap-2 w-100 justify-content-between">
                              <div>
                                <h6 className="mb-0 text-primary">
                                  {t("Address")}
                                </h6>
                                <p className="mb-0 ">{Address}</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6">
                  <div className="tp-contact-wrapper">
                    <div className="tp-contact-form">
                      <ContactForm />
                      <p className="ajax-response"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContactArea;
