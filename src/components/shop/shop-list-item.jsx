/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import { Cart, CompareThree, QuickView, Wishlist } from "@/svg";
import { handleProductModal } from "@/redux/features/productModalSlice";
import { add_cart_product } from "@/redux/features/cartSlice";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { add_to_compare } from "@/redux/features/compareSlice";
import { useCart } from "@/hooks/use-cart";
import { useWishList } from "@/hooks/use-wishlist";
import useAuthCheck from "@/hooks/use-auth-check";
import { useRouter } from "next/router";
import { notifyError } from "@/utils/toast";
import CNImage from "../CNImage";

const ShopListItem = ({ product }) => {
  const { reviews, discount, tags } = product || {};
  const dispatch = useDispatch();
  const authChecked = useAuthCheck();
  const route = useRouter();
  const [ratingVal, setRatingVal] = useState(0);
  const { deleteCartItem, onAddToCart, onUpdateCart, cartItems } = useCart();

  const { addProductToWishList, removeProductToWishList, wishlist } =
    useWishList();

  const isAddedToWishlist = wishlist.some(
    (prd) => prd?.attributes?.product?.data?.id === product.id
  );
  const wishlistItem = wishlist.find(
    (prd) => prd?.attributes?.product?.data?.id === product.id
  );
  const isAddedToCart =
    cartItems?.some((prd) => prd.attributes.product.data.id === product.id) ||
    false;
  const cartItem =
    cartItems?.find((prd) => prd.attributes.product.data.id === product.id) ||
    {};
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

  // handle add product
  const handleAddProduct = (prd) => {
    const data = {
      product: product?.id,
      quantity: 1,
    };
    if (!authChecked) {
      notifyError("Please login to purchase!");
      route.push("/login");
    } else {
      onAddToCart(data);
    }
  };
  // handle wishlist product

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

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };
  const removeFromCart = () => {
    deleteCartItem(cartItem.id);
  };
  return (
    <div
      className="tp-product-list-item d-md-flex "
      style={{
        border: "1px solid #e0e2e3",
      }}>
      <div className="tp-product-list-thumb p-relative fix ">
        <Link
          href={`/product/${product?.attributes?.slug}`}
          className="d-flex align-items-center productListParentDiv">
          <CNImage
            src={product?.attributes?.images?.data[0]?.attributes?.url}
            alt="product img"
            fill
            style={{
              objectFit: "contain",
            }}
            className="img-fluid"
          />
        </Link>

        {/* <!-- product action --> */}
        <div className="tp-product-action-2 tp-product-action-blackStyle">
          <div className="tp-product-action-item-2 d-flex flex-column">
            <button
              type="button"
              className="tp-product-action-btn-2 tp-product-quick-view-btn"
              onClick={() => dispatch(handleProductModal(product))}>
              <QuickView />
              <span className="tp-product-tooltip tp-product-tooltip-right">
                Quick View
              </span>
            </button>
            <button
              type="button"
              onClick={() =>
                isAddedToWishlist
                  ? removeProductToWishList({
                      deleteFavouriteId: wishlistItem.id,
                    })
                  : handleWishlistProduct(product)
              }
              // className="tp-product-action-btn-2 tp-product-add-to-wishlist-btn"
              className={`tp-product-action-btn-2 rounded-circle ${
                isAddedToWishlist ? "active" : ""
              } tp-product-add-to-wishlist-btn`}>
              <Wishlist />
              {!isAddedToWishlist ? (
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Add To Wishlist
                </span>
              ) : (
                <span className="tp-product-tooltip tp-product-tooltip-right">
                  Remove From Wishlist
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-list-content w-100 d-flex align-items-center">
        <div className="tp-product-content-2 pt-15 pb-15">
          <div className="tp-product-tag-2">
            {tags?.map((t, i) => (
              <a rel="noopener noreferrer" key={i} href="#">
                {t}
              </a>
            ))}
          </div>
          <h3 className="tp-product-title-2">
            <Link href={`/product/${product?.attributes?.slug}`}>
              {product?.attributes?.title.length > 30
                ? `${product.attributes.title.slice(0, 30)}...`
                : product.attributes.title}
            </Link>
            <p>{product.attributes.category.data.attributes.name}</p>
          </h3>
          <p>
            <Link href={`/product/${product?.attributes?.slug}`}>
              {" "}
              {product.attributes?.description?.length > 0 ? (
                <p>
                  {product.attributes?.description?.length > 50
                    ? `${product.attributes?.description.slice(0, 100)}...`
                    : product.attributes?.description}
                </p>
              ) : (
                <p>No Discription</p>
              )}
            </Link>
          </p>
          {/* <div className="tp-product-rating d-flex align-items-center">
            <div className="tp-product-rating-icon">
              <Rating
                allowFraction
                size={16}
                initialValue={ratingVal}
                readonly={true}
              />
            </div>
            <div className="tp-product-rating-text">
              <span>
                ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
              </span>
            </div>
          </div> */}
          <div className="tp-product-price-wrapper-2">
            {product?.attributes?.discount > 0 ? (
              <>
                <span className="tp-product-price-2 new-price">
                  SAR{" "}
                  {(
                    product?.attributes?.price -
                    (product?.attributes?.price *
                      product?.attributes?.discount) /
                      100
                  ).toFixed(2)}
                </span>{" "}
                <span className="tp-product-price-2 old-price">
                  {" "}
                  SAR {product.attributes?.price}
                </span>
              </>
            ) : (
              <span className="tp-product-price new-price">
                SAR {product.attributes?.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="tp-product-list-add-to-cart ">
            <button
              onClick={() =>
                !isAddedToCart ? handleAddProduct() : removeFromCart()
              }
              className="tp-product-list-add-to-cart-btn"
              style={{
                backgroundColor: isAddedToCart
                  ? "var(--tp-theme-primary)"
                  : "var(--tp-common-black)",
              }}>
              {isAddedToCart ? "Remove to Cart" : "Add To Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopListItem;
