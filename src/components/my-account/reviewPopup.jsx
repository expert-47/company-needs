import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import Modal from "react-modal";
import ReviewForm from "../forms/review-form";

Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        border: "1px solid var(--tp-theme-primary)",
        transform: "translate(-50%, -50%)",
        padding: "20px 50px 20px 50px",
        display: "flex",
        alignItems: "center",
    },
};
const buttonStyle = {
    padding: "10px 50px 10px 50px",
    fontSize: "18px",
    fontWeight: "700",
    backgroundColor: "var(--tp-theme-primary)",
    borderRadius: "0px",
    color: "var(--tp-common-white)",
    width: "100%",
    display: "flex",
    justifyContent: "center",
};

const ReviewPopup = ({ product_id, isOpen, onConfirm, onCancel }) => {
    const t = useTranslations("header");
    useEffect(() => {
        const handleBodyScroll = (event) => {
            if (isOpen) {
                event.preventDefault();
            }
        };
        if (isOpen) {
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
    }, [isOpen]);
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            contentLabel="Confirmation Modal"
            style={customStyles}
        >
            <div className="modal-content">
                <div className="text-end mb-40">
                    <button
                        onClick={onCancel}
                        type="button"
                        className="cartmini__close-btn cartmini-close-btn"
                        aria-label="cartmini close"
                    >
                        <i className="fal fa-times"></i>
                    </button>
                </div>
                <div className="modal-body pb-20">
                    <h3 className="tp-product-details-review-form-title">
                        {t("Review this product")}
                    </h3>
                    <p>
                        {t("Your email address will not be published")}
                    </p>
                    <ReviewForm product_id={product_id} onConfirm={onConfirm} />
                </div>
                {/* <div className="modal-footer d-flex justify-content-evenly">
                    <div className="container col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="row gap-2 d-flex justify-content-center">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 ">
                                <button
                                    style={buttonStyle}
                                    // variant="primary"
                                    onClick={onConfirm}
                                >
                                    {t("Confirm")}
                                </button>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5">
                                <button
                                    style={buttonStyle}
                                    variant="secondary"
                                    onClick={onCancel}
                                >
                                    {t("Cancel")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </Modal>
    );
};

export default ReviewPopup;
