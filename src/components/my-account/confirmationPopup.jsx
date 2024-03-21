import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "1px solid var(--tp-theme-primary)",
    transform: "translate(-50%, -50%)",
    padding: "50px 60px 50px 60px",
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

const ConfirmationPopup = ({ isOpen, message, onConfirm, onCancel }) => {
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
        <div className="modal-body pb-20">
          <h4>{message}</h4>
        </div>
        <div className="modal-footer d-flex justify-content-evenly">
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
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationPopup;
