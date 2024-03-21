/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice1 = createSlice({
  name: "cart1",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.cartItems.find(
        (item) => item.id === productToAdd.id
      );

      if (existingProduct) {
        existingProduct.attributes.quantity += 1;
      } else {
        state.cartItems.push({
          ...productToAdd,
          attributes: {
            ...productToAdd.attributes,
            quantity: productToAdd?.quantity || 1,
          },
        });
      }
    },
    removeFromCart: (state, action) => {
      const productToRemove = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (productToRemove) {
        if (productToRemove.attributes.quantity > 1) {
          productToRemove.attributes.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const productToUpdate = state.cartItems.find((item) => item._id === id);

      if (productToUpdate) {
        productToUpdate.attributes.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const productToUpdate = state.cartItems.find((item) => item._id === id);

      if (productToUpdate && productToUpdate.attributes.quantity > 1) {
        productToUpdate.attributes.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    clearUserCart: (state, action) => {
      const userId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.attributes.user.id !== userId
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  clearUserCart,
} = cartSlice1.actions;

export default cartSlice1.reducer;
