/** @format */

import React, { useEffect, useState } from "react";

const ShopTopRight = ({ handleSortingFilter, selectValue, data }) => {
  const [selectedValue, setSelectedValue] = useState(
    data?.length > 0 ? data[0].value : ""
  );

  useEffect(() => {
    setSelectedValue(selectValue);
  }, [selectValue]);
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
    handleSortingFilter(selectedValue);
  };

  return (
    <div className="tp-shop-top-right d-sm-flex align-items-center  ">
      <div className="tp-shop-top-select ">
        <select
          className="form-select shadow-none border-primary rounded-0 "
          value={selectedValue}
          onChange={handleSelectChange}>
          {data?.map((item) => (
            <option value={item?.value}>{item?.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ShopTopRight;
