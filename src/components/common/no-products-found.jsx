import React from "react";

const NoProductsFound = ({ message }) => {
  return (
    <div className="container text-center mt-3">
      <h6 className="text-danger display-6">{message}</h6>
    </div>
  );
};

export default NoProductsFound;
