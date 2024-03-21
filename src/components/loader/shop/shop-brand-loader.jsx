import React from "react";
import Loader from "../loader";

function SingleLoader({ loading }) {
  return (
    <div style={{ height: "25px" }}>
      <Loader loading={loading} />
    </div>
  );
}

const ShopBrandLoader = ({ loading }) => {
  return (
    <div className="row">
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
      <SingleLoader loading={loading} />
    </div>
  );
};

export default ShopBrandLoader;
