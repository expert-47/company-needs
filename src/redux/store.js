/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";
import cartSlice from "./features/cartSlice";
import compareSlice from "./features/compareSlice";
import productModalSlice from "./features/productModalSlice";
import shopFilterSlice from "./features/shop-filter-slice";
import wishlistSlice from "./features/wishlist-slice";
import couponSlice from "./features/coupon/couponSlice";
import orderSlice from "./features/order/orderSlice";
import { aboutUsSlice } from "./features/aboutSlice";
import cartSlice1 from "./features/cartSlice1";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    productModal: productModalSlice,
    shopFilter: shopFilterSlice,
    cart: cartSlice,
    cart1: cartSlice1,
    wishlist: wishlistSlice,
    compare: compareSlice,
    coupon: couponSlice,
    order: orderSlice,
    aboutUs: aboutUsSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
