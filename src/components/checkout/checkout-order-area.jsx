import { useCart } from "@/hooks/use-cart";
import { getLanguageBasedValue } from "@/lib/get-language";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const CheckoutOrderArea = ({ checkoutData }) => {
  const t = useTranslations("header");
  const { isCheckoutSubmit, shippingCost, isLoading } = checkoutData;
  const { cartItems, totalPrice } = useCart();
  const cart_products = cartItems;
  let totalDiscount = 0;
  cart_products.forEach((item) => {
    const discountValue =
      parseInt(item.attributes.product.data.attributes.discount) || 0;
    totalDiscount += discountValue;
  });
  const router = useRouter();
  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">{t("Your Order")}</h3>
      <div className="tp-order-info-list">
        <ul>
          <li className="tp-order-info-list-header">
            <h4>{t("Product")}</h4>
            <h4>{t("Total")}</h4>
          </li>
          {cart_products.map((item) => (
            <li key={item.id} className="tp-order-info-list-desc">
              <p>
                {getLanguageBasedValue(
                  item?.attributes?.product?.data?.attributes,
                  "title",
                  "",
                  router.locale
                ).slice(0, 30)}{" "}
                <span> x {item.attributes.quantity}</span>
              </p>
              {/* <span>
                SAR {item.attributes.product.data.attributes.discount || 0}
              </span> */}
              <span>
                SAR{" "}
                {(
                  item?.attributes?.product?.data?.attributes?.price -
                  (item?.attributes?.product?.data?.attributes?.price *
                    item?.attributes?.product?.data?.attributes?.discount) /
                    100
                )?.toFixed(2)}
              </span>
            </li>
          ))}
          {/* total */}
          <li className="tp-order-info-list-total">
            <span>{t("Total")}</span>
            <span>SAR {parseFloat(totalPrice).toFixed(2)}</span>
          </li>
        </ul>
      </div>
      {/* <div className='tp-checkout-payment'>
        <div className='tp-checkout-payment-item'>
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            type='radio'
            id='back_transfer'
            name='payment'
            value='Card'
          />
          <label
            onClick={() => setShowCard(true)}
            htmlFor='back_transfer'
            data-bs-toggle='direct-bank-transfer'>
            Credit Card
          </label>
          {showCard && (
            <div className='direct-bank-transfer'>
              <div className='payment_card'>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
        <div className='tp-checkout-payment-item'>
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            onClick={() => setShowCard(false)}
            type='radio'
            id='cod'
            name='payment'
            value='COD'
          />
          <label htmlFor='cod'>Cash on Delivery</label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div> */}
      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          {isLoading ? t("loading") + "..." : t("Place Order")}
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
