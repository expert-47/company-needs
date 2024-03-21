import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import BackToTopCom from "@/components/common/back-to-top";
import ProductModal from "@/components/common/product-modal";
import useAuthCheck from "@/hooks/use-auth-check";
import Loader from "@/components/loader/loader";
import { useTranslations } from "next-intl";
import { useWishList } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
const Wrapper = ({ children }) => {
  const { productItem } = useSelector((state) => state.productModal);
  const { getWishList } = useWishList();
  const { getCartProducts } = useCart();
  const t = useTranslations("header");
  const authChecked = useAuthCheck();
  useEffect(() => {
    if (authChecked) {
      getWishList();
      getCartProducts();
    }
  }, [authChecked]);
  return false ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Loader spinner="fade" loading={!authChecked} />
    </div>
  ) : (
    <div id="wrapper">
      {children}
      <BackToTopCom />
      <ToastContainer />
      {productItem && <ProductModal />}
    </div>
  );
};

export default Wrapper;
