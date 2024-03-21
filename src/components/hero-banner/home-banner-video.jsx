import React from "react";
import CNVideo from "../CNVideo";
import { useTranslations } from "next-intl";
import Link from "next/link";

const HomeBannerVideo = () => {
  const t = useTranslations("header");

  return (
    <>
      <div className="d-flex justify-content-center pt-135">
        <CNVideo />

        <div className="videoTopContent">
          <Link
            href="/register"
            className="btn btn-primary form-control py-md-3 py-2 my-3 shadow-none bg-primary text-white signUpButtonOnVideo"
          >
            {t("Register now")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeBannerVideo;
