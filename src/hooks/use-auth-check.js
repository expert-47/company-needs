import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { userLoggedIn, userLoggedOut } from "@/redux/features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const localAuth = getCookie("userInfo");
  const token = getCookie("token");
  useEffect(() => {
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (token && auth) {
        dispatch(
          userLoggedIn({
            accessToken: token,
            user: auth,
          })
        );
      }
      setAuthChecked(true);
    } else {
      setAuthChecked(false)
      dispatch(
        userLoggedOut({
          accessToken: undefined,
          user: undefined,
          isAuthenticated: false
        })
      )
    }
  }, [localAuth, token]);

  return authChecked;
}
