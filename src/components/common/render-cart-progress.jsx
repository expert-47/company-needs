import React from "react";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";

const RenderCartProgress = () => {
  const { totalPrice } = useCart();
  const t = useTranslations("header");
  const freeShippingThreshold = 200;
  const progress = (totalPrice / freeShippingThreshold) * 100;
  if (totalPrice < freeShippingThreshold) {
    const remainingAmount = freeShippingThreshold - totalPrice;
    return (
      <>
        <p>
          {t("Add")} {`SAR ${remainingAmount.toFixed(2)}`}{" "}
          {t("more to qualify for free shipping")}
        </p>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            data-width={`${progress}%`}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </>
    );
  }
  return (
    <>
      <p> {t("You are eligible for free shipping")}</p>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          data-width={`${progress}%`}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
};

export default RenderCartProgress;
