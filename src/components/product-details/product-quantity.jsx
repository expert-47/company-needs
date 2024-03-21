import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "@/svg";

const ProductQuantity = ({ productId, onQuantityChange }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const cartItem =
    cartItems?.find((prd) => prd.attributes.product.data.id === productId) ||
    {};

  const [quantity, setQuantity] = useState(cartItem?.attributes?.quantity || 1);
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    onQuantityChange(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="tp-product-details-quantity">
      <div className="tp-product-quantity mb-15 mr-15">
        <span className="tp-cart-minus" onClick={handleDecrease}>
          <Minus />
        </span>
        <input
          className="tp-cart-input"
          type="text"
          readOnly
          value={quantity}
        />
        <span className="tp-cart-plus" onClick={handleIncrease}>
          <Plus />
        </span>
      </div>
    </div>
  );
};

export default ProductQuantity;
