import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER_PROFILE,
  UPLOAD_PROFILE_IMAGE,
} from "@/graphql/mutation/auth";
import { getCookie, setCookie } from "cookies-next";
import { userLoggedIn } from "@/redux/features/auth/authSlice";
import { uploadFileClient } from "@/graphql/apollo-client";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { ProfileUser } from "@/svg";
import CNImage from "../CNImage";

const schema = Yup.object().shape({
  first_name: Yup.string().label("First Name").required(),
  last_name: Yup.string().label("Last Name").required(),
  email: Yup.string()
    .email()
    .label("Email")
    .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
  phoneNumber: Yup.string()
    .required("Phone is required")
    .label("Phone")
    .min(10),
  shipping_address: Yup.string().label("Address").required(),
  profile_image: Yup.string().label("Profile Image").required(),
});
const ProfileInfo = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const t = useTranslations("header");
  const [updateProfile, { data: userProfile, loading }] =
    useMutation(UPDATE_USER_PROFILE);
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
      name: userProfile?.updateUserProfile?.data?.attributes?.first_name,
      profile_image:
        userProfile?.updateUserProfile?.data?.attributes?.profile_image?.data
          ?.attributes,
      user_profile: {
        ...userProfile?.updateUserProfile?.data?.attributes,
        id: userProfile?.updateUserProfile?.data?.id,
        profile_image:
          userProfile?.updateUserProfile?.data?.attributes?.profile_image?.data
            ?.attributes,
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
      first_name: data?.attributes?.first_name,
      last_name: data?.attributes?.last_name,
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
            first_name: data.first_name,
            last_name: data.last_name,
            calling_code: firstPart,
            country_code: lebleUpperCase,
            phoneNumber: lastPart,
            shipping_address: data.shipping_address,
            profile_image: profileImage.id,
          },
          updateUserProfileId: user?.user_profile?.id,
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
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
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
                    {t("First Name")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    required
                    placeholder="First name*"
                    {...register("first_name")}
                    onChangeCapture={(e) => {
                      setValue(
                        "first_name",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.first_name?.message} />
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
                    {t("Last Name")} <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Last name*"
                    {...register("last_name")}
                    onChangeCapture={(e) => {
                      setValue(
                        "last_name",
                        e?.currentTarget?.value
                          ?.trimStart()
                          .replace(/ +(?= )/g, "")
                      );
                    }}
                  />
                  <ErrorMsg msg={errors.last_name?.message} />
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
                    {...register("email", { required: `Email is required!` })}
                    name="email"
                    type="email*"
                    placeholder="Enter your email"
                    disabled
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
                    className=""
                    name="shipping_address"
                    type="text"
                    placeholder="Enter your address*"
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
                  {loading ? t("loading") + "..." : t("Update")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
