import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import WishlistItem from "./wishlist-item";
import { useTranslations } from "next-intl";
import SearchPrdLoader from "../loader/search-prd-loader";
import useLoadingState from "@/hooks/use-loading";

const WishlistArea = () => {
  const t = useTranslations("header");
  const { wishlist } = useSelector((state) => state.wishlist);
  const loading = useLoadingState();
  return (
    <>
      {loading ? (
        <div>
          <SearchPrdLoader />
        </div>
      ) : (
        <section className="tp-cart-area pt-50 pb-80">
          <div className="container">
            {wishlist?.length === 0 && (
              <div className="text-center ">
                <h3>{t("No Wishlist Items Found")}</h3>
                <Link href="/products" className="tp-cart-checkout-btn mt-20">
                  {t("Continue Shipping")}
                </Link>
              </div>
            )}
            {wishlist?.length > 0 && (
              <div className="row">
                <div className="col-xl-12">
                  <div className="tp-cart-list mb-45 mr-30">
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
                          <th>{t("Action")}</th>
                          <th className="tp-cart-header-price">
                            {t("Remove")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlist?.map((item, i) => (
                          <WishlistItem key={i} wishList={item} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="tp-cart-bottom">
                    <div className="row align-items-end">
                      <div className="col-xl-6 col-md-4">
                        <div className="tp-cart-update">
                          <Link href="/cart" className="tp-cart-update-btn">
                            {t("Go To Cart")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default WishlistArea;
