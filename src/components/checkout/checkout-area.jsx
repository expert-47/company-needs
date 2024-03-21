import React, { useState } from "react";
import Link from "next/link";
import CheckoutBillingArea from "./checkout-billing-area";
import CheckoutOrderArea from "./checkout-order-area";
import useCheckoutSubmit from "@/hooks/use-checkout-submit";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";

const CheckoutArea = (userData) => {
  const [billingData, setBillingData] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const t = useTranslations("header");
  const updateBillingData = (data) => {
    setBillingData(data);
  };
  const updateShippingCost = (cost) => {
    setShippingCost(cost);
  };
  const checkoutData = useCheckoutSubmit(billingData, shippingCost);
  const { handleSubmit, submitHandler, register, errors, setValue } =
    checkoutData;
  const { cartItems } = useCart();
  const cart_products = cartItems;

  return (
    <>
      <section
        className="tp-checkout-area pb-120"
        style={{ backgroundColor: "#EFF1F5" }}
      >
        <div className="container">
          {cart_products?.length === 0 && (
            <div className="text-center pt-50">
              <h3 className="py-2">
                {t("No items found in cart to checkout")}
              </h3>
              <Link href="/products" className="tp-checkout-btn">
                {t("Return to shop")}
              </Link>
            </div>
          )}
          {cart_products?.length > 0 && (
            <div className="row">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  <div className="col-lg-7">
                    <CheckoutBillingArea
                      setValue={setValue}
                      register={register}
                      errors={errors}
                      updateBillingData={updateBillingData}
                      userData={userData}
                    />
                  </div>
                  <div className="col-lg-5">
                    <CheckoutOrderArea
                      checkoutData={checkoutData}
                      updateShippingCost={updateShippingCost}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
