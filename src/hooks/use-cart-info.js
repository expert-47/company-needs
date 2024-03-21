import { useState } from "react";

const useCartInfo = () => {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  return {
    quantity,
    total,
    setTotal,
  };
};

export default useCartInfo;
