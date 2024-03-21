import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_CART_QUANTITY,
  GET_ALL_CART_PRODUCT,
} from "@/graphql/mutation/cart";
import { getCookie } from "cookies-next";
import client from "@/graphql/apollo-client";
import { on_update_product } from "@/redux/features/cartSlice";
import { notifyError, notifySuccess } from "@/utils/toast";

export const useCart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalCount = cartItems?.reduce(
    (accumulator, item) => accumulator + item?.attributes?.quantity,
    0
  );
  const totalPrice = cartItems?.reduce(
    (accumulator, product) =>
      accumulator +
      (product.attributes?.product?.data?.attributes?.price -
        (product.attributes?.product?.data?.attributes?.price *
          product.attributes?.product?.data?.attributes?.discount) /
          100) *
        product?.attributes?.quantity,
    0
  );
  const dispatch = useDispatch();
  const token = getCookie("token");
  const userCookie = getCookie("userInfo");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const onUpdateCart = async (data) => {
    try {
      let response = await client.mutate({
        mutation: UPDATE_CART_QUANTITY,

        variables: data,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (response.data) {
        let index = cartItems.findIndex((prd) => prd.id == data.updateCartId);
        let items = [...cartItems];
        items[index] = {
          ...cartItems[index],
          ...{
            attributes: {
              ...cartItems[index].attributes,
              quantity: response.data.updateCart.data.attributes.quantity,
            },
          },
        };

        dispatch(on_update_product(items));
        notifySuccess(
          `${response.data.updateCart.data.attributes.product.data.attributes.title} quantity updated`
        );
      }
    } catch (error) {
      notifyError(error);
    }
  };
  const onAddToCart = async (data) => {
    try {
      let response = await client.mutate({
        mutation: ADD_TO_CART,
        variables: {
          data: {
            user: user.id,
            ...data,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (response?.data?.createCart?.data) {
        dispatch(
          on_update_product([...cartItems, response.data.createCart.data])
        );
      }
      notifySuccess(
        `${response?.data?.createCart?.data.attributes.product.data.attributes.title} added to cart`
      );
    } catch (error) {
      notifyError(error);
    }
  };
  const deleteCartItem = async (id) => {
    try {
      let response = await client.mutate({
        mutation: DELETE_FROM_CART,
        variables: {
          deleteCartId: id,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (response.data) {
        let data = cartItems.filter((data) => data.id != id);
        dispatch(on_update_product(data));
      }
    } catch (error) {
      notifyError("Failed to remove item");
    }
  };
  const getCartProducts = async () => {
    try {
      let data = {
        filters: {
          user: {
            id: {
              eq: user?.id,
            },
          },
        },
      };
      let response = await client.query({
        query: GET_ALL_CART_PRODUCT,
        variables: data,
        fetchPolicy: "network-only",
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (response.data) {
        dispatch(on_update_product(response?.data?.carts?.data || []));
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return {
    deleteCartItem,
    onAddToCart,
    onUpdateCart,
    cartItems,
    getCartProducts,
    totalCount,
    totalPrice,
    getCartProducts,
  };
};
