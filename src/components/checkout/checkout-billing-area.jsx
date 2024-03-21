import React, { useState } from "react";
import ErrorMsg from "../common/error-msg";
import { useTranslations } from "next-intl";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useSelector } from "react-redux";


const CheckoutBillingArea = ({ register, errors, setValue, userData }) => {
  const UserValues = userData?.userData?.attributes
  const t = useTranslations("header");
  const { user } = useSelector((state) => state.auth);
  const defultPhoneNumer1 = user?.phoneNumber?.replace(/[^\d]/g, "")
  const defultPhoneNumer2 = UserValues?.calling_code + UserValues?.phoneNumber
  const [phone, setPhone] = useState(defultPhoneNumer1 || defultPhoneNumer2);
  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">{t("Billing Details")}</h3>
      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  {t("First Name")} <span>*</span>
                </label>
                <input
                  {...register("firstName", {
                    required: t("First Name is required"),
                  })}
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder={t("First Name")}
                  onChangeCapture={(e) => {
                    setValue(
                      "firstName",
                      e?.currentTarget?.value
                        ?.trimStart()
                        .replace(/ +(?= )/g, "")
                    );
                  }}
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  {t("Last Name")} <span>*</span>
                </label>
                <input
                  {...register("lastName", {
                    required: t("Last Name is required"),
                  })}
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder={t("Last Name")}
                  // defaultValue={fullname[1] || fullname1[1]}
                  onChangeCapture={(e) => {
                    setValue(
                      "lastName",
                      e?.currentTarget?.value
                        ?.trimStart()
                        .replace(/ +(?= )/g, "")
                    );
                  }}
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  {t("Country")} <span>*</span>
                </label>
                <input
                  {...register("country", {
                    required: t("Country is required"),
                  })}
                  name="country"
                  id="country"
                  type="text"
                  placeholder={t("Country")}
                  onChangeCapture={(e) => {
                    setValue(
                      "country",
                      e?.currentTarget?.value
                        ?.trimStart()
                        .replace(/ +(?= )/g, "")
                    );
                  }}
                />
                <ErrorMsg msg={errors?.country?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  {t("Street address")} <span>*</span>
                </label>
                <input
                  {...register("address", {
                    required: t("Address is required"),
                  })}
                  name="address"
                  id="address"
                  type="text"
                  placeholder={t("Street address")}
                  onChangeCapture={(e) => {
                    setValue(
                      "address",
                      e?.currentTarget?.value
                        ?.trimStart()
                        .replace(/ +(?= )/g, "")
                    );
                  }}
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  {t("Town")} / {t("City")} <span>*</span>
                </label>
                <input
                  {...register("city", { required: t("City is required") })}
                  name="city"
                  id="city"
                  type="text"
                  placeholder={t("City")}
                  onChangeCapture={(e) => {
                    setValue(
                      "city",
                      e?.currentTarget?.value
                        ?.trimStart()
                        .replace(/ +(?= )/g, "")
                    );
                  }}
                />
                <ErrorMsg msg={errors?.city?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  {t("Postcode ZIP")} <span>*</span>
                </label>
                <input
                  {...register("zipCode", {
                    required: t("ZipCode is required"),
                  })}
                  name="zipCode"
                  id="zipCode"
                  type="text"
                  placeholder={t("Postcode ZIP")}
                  onChangeCapture={(e) => {
                    setValue(
                      "zipCode",
                      e?.currentTarget?.value
                        ?.trimStart()
                        .replace(/ +(?= )/g, "")
                    );
                  }}
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  {t("Phone")} <span>*</span>
                </label>
                <PhoneInput
                  {...register("contactNo", {
                    required: t("Contact Number is required"),
                  })}
                  name="contactNo"
                  id="contactNo"
                  className={`form-control rounded-0 p-0`}
                  style={
                    {
                      "--react-international-phone-border-radius": 0,
                      "--react-international-phone-border-color": "none",
                      "--react-international-phone-dropdown-item-background-color": "white",
                      "--react-international-phone-background-color": "transparent",
                      "--react-international-phone-text-color": "black",
                      "--react-international-phone-selected-dropdown-item-background-color": "transparent",
                      "--react-international-phone-selected-dropdown-zindex": "1",
                      "--react-international-phone-height": "50px"
                    }
                  }
                  placeholder={t("Enter your phone here")}
                  defaultCountry={"sa"}
                  value={phone}
                  forceDialCode={false}
                  onChange={(phone) => {
                    const cleanedPhone = phone.replace(/[^\d]/g, "");
                    setPhone(phone)
                    setValue("contactNo", cleanedPhone);
                  }}
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  {t("Email address")} <span>*</span>
                </label>
                <input
                  {...register("email", { required: t("Email is required") })}
                  name="email"
                  id="email"
                  type="email"
                  placeholder={t("Email address")}
                  defaultValue={user?.email}
                  onChangeCapture={(e) => {
                    setValue(
                      "email",
                      e?.currentTarget?.value
                        ?.trimStart()
                        .replace(/ +(?= )/g, "")
                    );
                  }}
                />
                <ErrorMsg msg={errors?.email?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  {t("Order notes")}{" "}
                  <span className="text-primary">({t("optional")})</span>
                </label>
                <textarea
                  {...register("orderNote", { required: false })}
                  name="orderNote"
                  id="orderNote"
                  placeholder={t("Order notes")}
                  onChangeCapture={(e) => {
                    setValue(
                      "orderNote",
                      e?.currentTarget?.value
                        ?.trimStart()
                        .replace(/ +(?= )/g, "")
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
