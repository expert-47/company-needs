import React from "react";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import google_icon from "@assets/img/icon/login/google.svg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useMutation } from "@apollo/client";
import { GOOGLE_LOGIN } from "@/graphql/mutation/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";

const GoogleSignUp = () => {
  const [googleLogin, { loading, error }] = useMutation(GOOGLE_LOGIN);
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch = useDispatch();
  const handleGoogleSignIn = async (users) => {
    dispatch(userLoggedOut());
    if (users) {
      try {
        const response = await googleLogin({
          variables: {
            input: {
              id_token: users?.credential,
            },
          },
        });
        const res = response?.data?.googleLogin;

        if (res) {
          const { jwt, user, status } = res;
          const companyProfile = user?.company_profile || {};
          const userProfile = user?.user_profile || {};

          const userData = {
            ...user,
            name: companyProfile?.companyName || userProfile?.first_name,
            profile_image:
              userProfile?.profile_image || companyProfile?.profile_image,
            company_profile: companyProfile,
            user_profile: userProfile,
            formType: user?.type,
          };

          if (status === "202") {
            const Email = res?.email;
            setCookie("google_email", Email);
            setCookie("id_token", users?.credential);
            router.push(redirect || "/register");
            notifyError(res?.error?.message);
          } else {
            setCookie("token", jwt);
            setCookie("userInfo", JSON.stringify(userData));

            notifySuccess("Successfully LoggedIn!");
            router.push(redirect || "/");
          }
        } else {
          notifyError(res?.error?.message);
        }
      } catch (err) {
        notifyError(err?.message || "Something went wrong during login.");
      }
    }
  };

  return (
    <div>
      <GoogleLogin
        render={(renderProps) => (
          <a
            rel="noopener noreferrer"
            style={{ cursor: "pointer" }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <span className="d-flex justify-content-center align-items-center w-100">
              <Image src={google_icon} alt="google_icon" />
              <span className="ms-2">Sign in with Google</span>
            </span>
          </a>
        )}
        onSuccess={handleGoogleSignIn}
        onFailure={(err) =>
          notifyError(err?.message || "Something went wrong with login.")
        }
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleSignUp;
