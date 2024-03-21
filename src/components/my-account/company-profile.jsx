import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";
import {
  UPDATE_COMPANY_PROFILE,
  UPLOAD_PROFILE_IMAGE,
} from "@/graphql/mutation/auth";
import { useMutation } from "@apollo/client";
import { getCookie, setCookie } from "cookies-next";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { uploadFileClient } from "@/graphql/apollo-client";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { ProfileUser } from "@/svg";
import CNImage from "../CNImage";
const schema = Yup.object().shape({
  companyName: Yup.string().label("Company Name").required(),
  crNumber: Yup.string().label("CR Number").required(),
  taxNumber: Yup.string().label("Tax Number").required(),
  email: Yup.string()
    .email()
    .label("Email")
    .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
  phoneNumber: Yup.string()
    .required("Phone is required")
    .label("Phone")
    .min(10),
  shipping_address: Yup.string().label("Address").required(),
});
const CompanyProfile = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const t = useTranslations("header");
  const [updateProfile, { error, data: userProfile, loading }] = useMutation(
    UPDATE_COMPANY_PROFILE
  );
  const [profileImage, setProfileImage] = useState({
    id: data?.attributes.profile_image?.data?.id,
    url: data?.attributes.profile_image?.data?.attributes?.url,
  });
  const token = getCookie("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userProfile || loading) {
      return;
    }
    const userInfo = JSON.parse(getCookie("userInfo"));
    let userData = {
      ...userInfo,
      name: userProfile?.updateCompanyProfile?.data?.attributes?.companyName,
      profile_image:
        userProfile?.updateCompanyProfile?.data?.attributes?.profile_image?.data
          ?.attributes,
      company_profile: {
        ...userProfile?.updateCompanyProfile?.data?.attributes,
        id: userProfile?.updateCompanyProfile?.data?.id,
        profile_image:
          userProfile?.updateCompanyProfile?.data?.attributes?.profile_image
            ?.data?.attributes,
      },
    };
    dispatch(
      userLoggedIn({
        accessToken: token,
        user: userData,
      })
    );
    setCookie("userInfo", userData);
  }, [userProfile, loading]);

  const [phone, setPhone] = useState(
    data?.attributes?.calling_code + data?.attributes?.phoneNumber || ""
  );
  const [leble, setLeble] = useState(data?.country_code || "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      companyName: data?.attributes?.companyName,
      crNumber: data?.attributes?.CRNumber,
      taxNumber: data?.attributes?.taxNumber,
      phoneNumber:
        data?.attributes?.calling_code + data?.attributes?.phoneNumber,
      shipping_address: data?.attributes?.shipping_address,
      profile_image: data?.attributes.profile_image?.data?.attributes?.url,
    },
  });

  const [uploading, setUploading] = useState(false);
  const onUploadImage = async ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    try {
      setUploading(true);
      let response = await uploadFileClient.mutate({
        mutation: UPLOAD_PROFILE_IMAGE,
        variables: { file },
      });
      setProfileImage({
        id: response?.data?.upload?.data?.id,
        url: response?.data?.upload?.data?.attributes?.url,
      });
    } finally {
      setUploading(false);
    }
  };
  const onSubmit = async (data) => {
    const phoneNumber = data.phoneNumber;
    const splitPhone = phoneNumber.split(" ");
    const firstPart = splitPhone[0].replace(/[^\d]/g, "");
    const lastPart = splitPhone[1].replace(/[^\d]/g, "");
    const lebleUpperCase = leble.toUpperCase();
    try {
      await updateProfile({
        variables: {
          data: {
            CRNumber: data?.crNumber,
            companyName: data?.companyName,
            taxNumber: data?.taxNumber,
            calling_code: firstPart,
            country_code: lebleUpperCase,
            phoneNumber: lastPart,
            shipping_address: data?.shipping_address,
            profile_image: profileImage.id,
          },
          updateCompanyProfileId: user?.company_profile?.id,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      notifySuccess("Profile Updated successfully!");
    } catch (error) {
      notifyError("Unable to Update Profile!");
    }
  };
  return (
    <div className="profile__info">
      <h3 className="profile__info-title">{t("Personal Details")}</h3>
      <div className="profile__info-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="mb-10 d-flex flex-column justify-content-center align-items-center">
              {uploading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div>
                  {!profileImage?.url ? (
                    <div className="tp-header-login-icon">
                      <span
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid",
                          cursor: "auto",
                        }}
                      >
                        <ProfileUser />
                      </span>
                    </div>
                  ) : (
                    <CNImage
                      src={profileImage.url}
                      alt="Uploaded Preview"
                      width={100}
                      height={100}
                      quality={100}
                      style={{
                        layout: "responsive",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        cursor: "auto",
                      }}
                      className="img-fluid"
                    />
                  )}
                </div>
              )}
              <input
                style={{ width: "178px", cursor: "pointer" }}
                name="profile_image"
                type="file"
                className="mt-10"
                accept=".png, .jpg, jpeg"
                onChangeCapture={onUploadImage}
                {...register("profile_image")}
              />
              <ErrorMsg msg={errors.profile_image?.message} />
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Company Name")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    {...register("companyName")}
                    name="companyName"
                    type="text"
                    placeholder="Enter your Company Name"
                    onChangeCapture={(e) => {
                      setValue(
                        "companyName",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.companyName?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Email")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    disabled
                    placeholder="Enter your email"
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
                  <ErrorMsg msg={errors.email?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("CR Number")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="crNumber"
                    type="text"
                    placeholder="Enter your CR Number"
                    {...register("crNumber")}
                    onChangeCapture={(e) => {
                      setValue(
                        "crNumber",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                          .replace(/[^\d\s+]/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.crNumber?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Tax Number")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="taxNumber"
                    type="text"
                    placeholder="Enter your Tax Number"
                    {...register("taxNumber")}
                    onChangeCapture={(e) => {
                      setValue(
                        "taxNumber",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                          .replace(/[^\d\s+]/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.taxNumber?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="phone"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Phone Number")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <PhoneInput
                    name="phoneNumber"
                    id="phoneNumber"
                    className={`form-control rounded-0 p-1`}
                    style={{
                      "--react-international-phone-border-radius": 0,
                      "--react-international-phone-border-color": "none",
                      "--react-international-phone-dropdown-item-background-color":
                        "white",
                      "--react-international-phone-background-color":
                        "transparent",
                      "--react-international-phone-text-color": "black",
                      "--react-international-phone-selected-dropdown-item-background-color":
                        "transparent",
                      "--react-international-phone-selected-dropdown-zindex":
                        "1",
                      "--react-international-phone-height": "50px",
                    }}
                    placeholder={t("Enter your phone here")}
                    defaultCountry={leble}
                    value={phone}
                    forceDialCode={true}
                    onChange={(phone, labels) => {
                      setPhone(phone);
                      setLeble(labels);
                      setValue("phoneNumber", phone);
                    }}
                  />
                  <ErrorMsg msg={errors.phoneNumber?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <label
                    htmlFor="companyName"
                    className="form-label text-black fw-semibold p-0 m-0"
                  >
                    {t("Address")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <textarea
                    name="shipping_address"
                    type="text"
                    placeholder="Enter your address"
                    {...register("shipping_address")}
                    onChangeCapture={(e) => {
                      setValue(
                        "shipping_address",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />

                  <ErrorMsg msg={errors.shipping_address?.message} />
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="profile__btn">
                <button type="submit" className="tp-btn" disabled={loading}>
                  {loading ? t("loading") + "..." : t("Update Profile")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
