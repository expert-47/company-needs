/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryFilter from "../shop/shop-filter/category-filter";

import ProductBrand from "../shop/shop-filter/product-brand";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ResetButton from "../shop/shop-filter/reset-button";

const ShopFilterOffCanvas = ({
  products,
  otherProps,
  categories,
  subCategories,
  all_brands,

  selectedCategories,

  handleCategoryFilter,
  selectedSubCategories,

  handleSubCategoryFilter,
  selectedBrands,

  handleBrandFilter,

  handleResetFilters,

  accordian,
}) => {
  // const { priceFilterValues, setCurrPage } = otherProps;
  const { filterSidebar } = useSelector((state) => state.shopFilter);
  const dispatch = useDispatch();
  const { currPage, setCurrPage } = otherProps;

  return (
    <>
      <div
        className={`tp-filter-offcanvas-area ${
          filterSidebar ? "offcanvas-opened" : ""
        }`}>
        <div className="tp-filter-offcanvas-wrapper">
          <div className="tp-filter-offcanvas-close">
            <button
              type="button"
              onClick={() => dispatch(handleFilterSidebarClose())}
              className="tp-filter-offcanvas-close-btn filter-close-btn">
              <i className="fa-solid fa-xmark"></i> Close
            </button>
          </div>
          <div className="tp-shop-sidebar">
            {/* filter */}
            {/* <PriceFilter
              priceValue={priceValue}
              handleChanges={handleChanges}
              maxPrice={maxPrice}
              handleFilterClick={handlePriceFilter}
            /> */}
            {/* categories */}
            {!accordian && (
              <CategoryFilter
                categoriesList={categories}
                subCategoriesList={subCategories}
                handleCategoryFilter={handleCategoryFilter}
                handleSubCategoryFilter={handleSubCategoryFilter}
                selectedCategories={selectedCategories}
                selectedSubCategories={selectedSubCategories}
              />
            )}
            {/* brand */}
            <ProductBrand
              setCurrPage={setCurrPage}
              all_brands={all_brands}
              handleBrandFilter={handleBrandFilter}
              selectedBrands={selectedBrands}
              accordian={accordian}
            />
            {/* reset filter */}
            <ResetButton handleResetFilters={handleResetFilters} />
          </div>
        </div>
      </div>

      {/* overlay start */}
      <div
        onClick={() => dispatch(handleFilterSidebarClose())}
        className={`body-overlay ${filterSidebar ? "opened" : ""}`}></div>
      {/* overlay end */}
    </>
  );
};

export default ShopFilterOffCanvas;
