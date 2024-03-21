import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  orderQuantity: 1,
  cartMiniOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    on_update_product: (state, { payload }) => {
      return {
        cartItems: payload,
      };
    },
    increment: (state, { payload }) => {},
    decrement: (state, { payload }) => {},
    quantityDecrement: (state, { payload }) => {},
    remove_product: (state, { payload }) => {},
    get_cart_products: (state, action) => {},
    initialOrderQuantity: (state, { payload }) => {},
    clearCart: (state) => {},
    openCartMini: (state, { payload }) => {
      state.cartMiniOpen = true;
    },
    closeCartMini: (state, { payload }) => {
      state.cartMiniOpen = false;
    },
  },
});

export const {
  add_cart_product,
  increment,
  decrement,
  get_cart_products,
  remove_product,
  quantityDecrement,
  initialOrderQuantity,
  clearCart,
  closeCartMini,
  openCartMini,
  on_update_product,
} = cartSlice.actions;
export default cartSlice.reducer;
