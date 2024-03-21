import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "@/utils/localstorage";
import { notifyError, notifySuccess } from "@/utils/toast";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    update_wishlist: (state, { payload }) => {
      return {
        wishlist: payload,
      };
    },
  },
});

export const { update_wishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
