/** @format */

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Close, Minus, Plus } from "@/svg";
import { useWishList } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { notifySuccess } from "@/utils/toast";

const WishlistItem = ({ wishList, product }) => {
  const t = useTranslations("header");
  const [quantity, setQuantity] = useState(1);
  const {
    addProductToWishList,
    removeProductToWishList,
    getWishList,
    wishlist,
  } = useWishList();

  const { onAddToCart, onUpdateCart, cartItems, deleteCartItem } = useCart();
  const wishListID = wishList?.attributes?.product?.data?.id || {};
  const wishlistData = wishList?.attributes?.product?.data?.attributes;
  const wishlistSlug = wishList?.attributes?.product?.data?.attributes?.slug;
  const cartItem = cartItems?.find(
    (item) => item.attributes.product.data.id === wishListID
  );
  const handleAddProduct = async () => {
    const data = {
      product: wishListID,
      quantity: quantity,
    };
    await onAddToCart(data);
  };
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const handleRemovePrd = async () => {
    const data = {
      deleteFavouriteId: wishList?.id,
    };
    await removeProductToWishList(data);
  };
  const removeFromProduct = () => {
    deleteCartItem(cartItem.id);
    setQuantity(1);
    notifySuccess("Successfully Removed from cart");
  };

  return (
    <tr>
      <td className="tp-cart-img">
        <Link href={`/product/${wishlistSlug}`}>
          <Image
            src={wishlistData?.images?.data[0]?.attributes?.url}
            alt="product img"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </td>
      <td className="tp-cart-title">
        <Link href={`/product/${wishlistSlug}`}>{wishlistData?.title}</Link>
      </td>
      <td className="tp-cart-price">
        <span>
          SAR {(wishlistData?.price - wishlistData?.discount).toFixed(2)}
        </span>
      </td>
      <td className="tp-cart-quantity">
        {!cartItem ? (
          <div className="tp-product-quantity mt-10 mb-10">
            <span onClick={handleDecrement} className="tp-cart-minus">
              <Minus />
            </span>
            <input
              className="tp-cart-input"
              type="text"
              value={quantity}
              readOnly
            />
            <span onClick={handleIncrement} className="tp-cart-plus">
              <Plus />
            </span>
          </div>
        ) : (
          <></>
        )}
      </td>

      <td className="tp-cart-add-to-cart">
        {cartItem ? (
          <button
            onClick={removeFromProduct}
            type="button"
            className="tp-btn tp-btn-2 tp-btn-blue"
          >
            {t("Remove from Cart")}
          </button>
        ) : (
          <button
            onClick={handleAddProduct}
            type="button"
            className="tp-btn tp-btn-2 tp-btn-blue"
          >
            {t("Add To Cart")}
          </button>
        )}
      </td>

      <td className="tp-cart-action">
        <button onClick={handleRemovePrd} className="tp-cart-action-btn">
          <Close />
          <span> {t("Remove")}</span>
        </button>
      </td>
    </tr>
  );
};

export default WishlistItem;
