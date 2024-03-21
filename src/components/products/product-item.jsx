import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { Cart, QuickView, Wishlist } from "@/svg";
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import useAuthCheck from "@/hooks/use-auth-check";
import { useRouter } from "next/router";
import { notifyError } from "@/utils/toast";
import { useCart } from "@/hooks/use-cart";
import { useWishList } from "@/hooks/use-wishlist";
import CNImage from "../CNImage";
import { getLanguageBasedValue } from "@/lib/get-language";
import { useTranslations } from "next-intl";

const ProductItem = ({ product, offer_style = false }) => {
  const { _id, reviews, discount, status, offerExpiryTime } = product || {};
  const { onAddToCart, onUpdateCart, cartItems } = useCart();
  const { addProductToWishList, removeProductToWishList, wishlist } =
    useWishList();
  const isAddedToCart =
    cartItems?.some(
      (prd) => prd?.attributes?.product?.data?.id === product?.id
    ) || false;
  const isAddedToWishlist = wishlist.some(
    (prd) => prd?.attributes?.product?.data?.id === product?.id
  );
  const wishlistItem = wishlist.find(
    (prd) => prd?.attributes?.product?.data?.id === product?.id
  );
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);
  const authChecked = useAuthCheck();
  const t = useTranslations("header");
  const route = useRouter();
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  const handleAddProduct = () => {
    if (!authChecked) {
      notifyError("Please login to purchase!");
      route.push("/login");
    } else {
      onAddToCart({
        product: product.id,
        quantity: 1,
      });
    }
  };
  const handleWishlistProduct = (prd) => {
    if (!authChecked) {
      notifyError("Please login to purchase!");
      route.push("/login");
    } else {
      addProductToWishList({
        product: product.id,
      });
    }
  };

  return (
    <>
      <div
        className={`${
          offer_style ? "tp-product-offer-item bg-white" : "mb-25"
        } tp-product-item transition-3`}
      >
        <div className="tp-product-thumb p-relative fix">
          <Link href={`/product/${product?.attributes?.slug}`}>
            <div
              style={{
                width: "100%",
                height: "200px",
                padding: 0,
              }}
            >
              <CNImage
                src={product?.attributes?.images?.data[0]?.attributes?.url}
                alt="product img"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">out-stock</span>
                )}
              </div>
            </div>
          </Link>

          <div className="tp-product-action">
            <div className="tp-product-action-item d-flex flex-column">
              {isAddedToCart && authChecked ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn rounded-circle mb-10 ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart /> <span className="tp-product-tooltip">View Cart</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct()}
                  type="button"
                  className={`tp-product-action-btn rounded-circle mb-10 ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                  disabled={status === "out-of-stock"}
                >
                  <Cart />
                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}

              <button
                type="button"
                className={`tp-product-action-btn rounded-circle ${
                  isAddedToWishlist ? "active" : ""
                } tp-product-add-to-wishlist-btn`}
                onClick={() =>
                  isAddedToWishlist
                    ? removeProductToWishList({
                        deleteFavouriteId: wishlistItem.id,
                      })
                    : handleWishlistProduct(product)
                }
                disabled={status === "out-of-stock"}
              >
                <Wishlist />
                {!isAddedToWishlist ? (
                  <span className="tp-product-tooltip">Add To Wishlist</span>
                ) : (
                  <span className="tp-product-tooltip">
                    Remove From Wishlist
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="tp-product-content">
          <div className=" pt-1 pb-1 skuBackgroundColor">
            <a
              rel="noopener noreferrer"
              style={{
                fontWeight: "600",
                fontSize: "16px",
              }}
              className="pl-5"
            >
              {product?.attributes?.sku == null ? "SKU: 000000" : "SKU: "}
              {product?.attributes?.sku?.slice(0, 30)}
              {product?.attributes?.sku?.length > 30 && `...`}
            </a>
          </div>
          <h3
            className="tp-product-title mt-15 pl-5 pr-5"
            style={{
              height: "40px",
            }}
          >
            <Link href={`/product/${product?.attributes?.slug}`}>
              {`${getLanguageBasedValue(
                product?.attributes,
                "title",
                "",
                route.locale
              ).slice(0, 22)}`}
              {product?.attributes?.title.length > 22 && "..."}
            </Link>
          </h3>

          <div>
            <div className="tp-product-price-wrapper pl-5 pr-5">
              {product?.attributes?.discount > 0 ? (
                <>
                  <span className="tp-product-price old-price">
                    {(product?.attributes?.price).toFixed(2)} SAR
                    <span style={{ fontWeight: "bold" }}>{"(Excl VAT)"}</span>
                  </span>
                  <span className="tp-product-price new-price">
                    {(
                      product?.attributes?.price -
                      (product?.attributes?.price *
                        product?.attributes?.discount) /
                        100
                    ).toFixed(2)}{" "}
                    SAR
                    <span style={{ fontWeight: "bold" }}>{"(Excl VAT)"}</span>
                  </span>
                </>
              ) : (
                <span className="tp-product-price new-price">
                  {parseFloat(product?.attributes?.price).toFixed(2)} SAR{" "}
                  <span style={{ fontWeight: "bold" }}>{"(Excl VAT)"}</span>
                </span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between ">
            <div>
              <span className="tp-product-price new-price pl-5 pr-5">
                <span>{t("(Before corporate discount)")}</span>
              </span>
            </div>
            <div
              style={{
                position: "relative",
                alignItems: "center",
                display: "flex",
              }}
            >
              <button
                onClick={() => dispatch(handleProductModal(product))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn rounded-circle show-icon"
              >
                <QuickView />
                <span className="tp-product-tooltip">Quick View</span>
              </button>
            </div>
          </div>

          {offer_style && (
            <div className="tp-product-countdown">
              <div className="tp-product-countdown-inner">
                {dayjs().isAfter(offerExpiryTime) ? (
                  <ul>
                    <li>
                      <span>{0}</span> Day
                    </li>
                    <li>
                      <span>{0}</span> Hrs
                    </li>
                    <li>
                      <span>{0}</span> Min
                    </li>
                    <li>
                      <span>{0}</span> Sec
                    </li>
                  </ul>
                ) : (
                  <Timer expiryTimestamp={new Date(offerExpiryTime)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
