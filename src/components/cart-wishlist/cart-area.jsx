import React, { useEffect, useState } from "react";
import Link from "next/link";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";
import { getCookie } from "cookies-next";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";
import useLoadingState from "@/hooks/use-loading";
import SearchPrdLoader from "../loader/search-prd-loader";

const CartArea = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { cartItems } = useCart();
  const t = useTranslations("header");
  const loading = useLoadingState();
  useEffect(() => {
    const userCookie = getCookie("userInfo");
    const user = userCookie ? JSON.parse(userCookie) : null;
    setUserInfo(user);
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <SearchPrdLoader />
        </div>
      ) : (
        <section className="tp-cart-area pb-80 pt-50 ">
          <div className="container">
            {cartItems.length === 0 && (
              <div className="text-center">
                <h3>{t("No Cart Items Found")}</h3>
                <Link href="/products" className="tp-cart-checkout-btn mt-20">
                  {t("Continue Shopping")}
                </Link>
              </div>
            )}
            {cartItems?.length > 0 && (
              <div className="row">
                <div className="col-xl-9 col-lg-8">
                  <div className="tp-cart-list mb-25 mr-30">
                    {/* <div className="cartmini__shipping">
                    <RenderCartProgress />
                  </div> */}
                    <table className="table">
                      <thead>
                        <tr>
                          <th colSpan="2" className="tp-cart-header-product">
                            {t("Product")}
                          </th>
                          <th className="tp-cart-header-price">{t("Price")}</th>
                          <th className="tp-cart-header-quantity">
                            {t("Quantity")}
                          </th>
                          <th className="tp-cart-header-quantity">
                            {t("Remove")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems?.map((item, i) => (
                          <CartItem key={i} product={item} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="tp-cart-bottom">
                    <div className="row align-items-end">
                      <div className="col-xl-6 col-md-4">
                        <div className="tp-cart-update text-md-end mr-30">
                          {/* <button
                          onClick={clearCartItems}
                          type="button"
                          className="tp-cart-update-btn"
                        >
                          Clear Cart
                        </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <CartCheckout />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default CartArea;
