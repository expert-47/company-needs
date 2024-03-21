/** @format */

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { notifySuccess } from "@/utils/toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const CartCheckout = () => {
  const { totalPrice } = useCart();
  const [isLoading, setLoading] = useState(false);
  const t = useTranslations("header");
  const [shipCost, setShipCost] = useState(0);
  const route = useRouter();
  const handleShippingCost = (value) => {
    if (value === "free") {
      setShipCost(0);
    } else {
      setShipCost(value);
    }
  };
  const formattedTotalPrice = (totalPrice + shipCost).toFixed(2);
  const handleCheckout = () => {
    setLoading(true);
  };
  return (
    <div className="tp-cart-checkout-wrapper">
      <div className="tp-cart-checkout-top d-flex align-items-center justify-content-between">
        <span className="tp-cart-checkout-top-title">{t("Subtotal")}</span>
        <span className="tp-cart-checkout-top-price">
          SAR {formattedTotalPrice}
        </span>
      </div>
      <div className="tp-cart-checkout-proceed">
        <Link
          href="/checkout"
          className="tp-cart-checkout-btn text-white w-100"
          onClick={handleCheckout}
          aria-disabled
        >
          {isLoading ? (
            <span>{t("loading")}...</span>
          ) : (
            <span>{t("Proceed to Checkout")}</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default CartCheckout;
