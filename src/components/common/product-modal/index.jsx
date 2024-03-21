import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { handleModalClose } from "@/redux/features/productModalSlice";
import { initialOrderQuantity } from "@/redux/features/cartSlice";
import PopUpWrapper from "@/components/product-details/popup-wrapper";
import PopupThumbWrapper from "@/components/product-details/popup-image-wrapper";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px 20px",
  },
};

const ProductModal = () => {
  const { productItem, isModalOpen } = useSelector(
    (state) => state.productModal
  );
  const { status } = productItem || {};
  const img = productItem?.attributes?.images?.data[0]?.attributes?.url;
  const [activeImg, setActiveImg] = useState(img);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveImg(img);
    dispatch(initialOrderQuantity());
    setLoading(false);
  }, [img, dispatch]);

  const handleImageActive = () => {
    setActiveImg(img);
    setLoading(true);
  };

  useEffect(() => {
    const handleBodyScroll = (event) => {
      if (isModalOpen) {
        event.preventDefault();
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleBodyScroll);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleBodyScroll);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleBodyScroll);
    };
  }, [isModalOpen]);

  return (
    <div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(handleModalClose())}
        style={customStyles}
        contentLabel="Product Modal"
        shouldCloseOnEsc={false}
        // className={"manageTopBottomPaddingMobile"}
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex">
            <button
              onClick={() => dispatch(handleModalClose())}
              type="button"
              className="tp-product-modal-close-btn"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
            <PopupThumbWrapper
              activeImg={img}
              handleImageActive={handleImageActive}
              imageURLs={img}
              imgWidth={416}
              imgHeight={480}
              loading={loading}
              status={status}
            />
            <PopUpWrapper
              productItem={productItem}
              handleImageActive={handleImageActive}
              activeImg={activeImg}
            />
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ProductModal;
