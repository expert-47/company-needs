/** @format */

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import ErrorMsg from "@/components/common/error-msg";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopBrandLoader from "@/components/loader/shop/shop-brand-loader";
import { useTranslations } from "next-intl";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_BRANDS_DATA } from "@/graphql/query/brands";
import CloseIconCircle from "@/svg/close-circle-icon";
import { getLanguageBasedValue } from "@/lib/get-language";

const ProductBrand = ({
  shop_right = false,
  all_brands,
  selectedBrands,
  handleBrandFilter,
}) => {
  const t = useTranslations("header");
  const [categoriesBrandQuery, {}] = useLazyQuery(ALL_BRANDS_DATA);

  const [pageNumber, setPageNumber] = useState(2);
  const [loadMoreButtonState, setLoadMoreButtonState] = useState(false);
  const [brandsListState, setBrandsListState] = useState([...all_brands]);

  let content = null;

  const router = useRouter();

  // if (loading) {
  //   content = <ShopBrandLoader loading={true} />;
  // } else

  const getPaginationDataBrandsList = async () => {
    let paginationFilters = {
      variables: {
        pagination: {
          page: pageNumber,
          pageSize: 12,
        },
      },
    };

    let response = await categoriesBrandQuery(paginationFilters);
    setBrandsListState([...brandsListState, ...response?.data?.brands?.data]);

    setPageNumber(pageNumber + 1);
    if (response?.data?.brands?.data?.length < 12) {
      setLoadMoreButtonState(true);
    }
  };
  if (all_brands?.length === 0) {
    content = <ErrorMsg msg="No Brands found!" />;
  } else {
    content = (
      <div
        class="accordion accordion-flush accordianPopularBrands"
        id="accordianBrand"
        style={{ maxHeight: "220px" }}
      >
        <div class="accordion-item">
          {/* <h2 class="accordion-header" id="accordianBrandHeading"> */}
          <button
            class="accordion-button show"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#accordianAreaTargetBrand"
            aria-expanded="false"
            aria-controls="accordianAreaTargetBrand"
          >
            {t("Popular Brands")}
          </button>
          {/* </h2> */}

          <div className="box">
            <div
              id="accordianAreaTargetBrand"
              class="accordion-collapse collapse show accordianCollapseCategories"
              aria-labelledby="accordianBrandHeading"
              data-bs-parent="#accordianBrand"
            >
              <div class="accordion-body row accordianBodayPadding">
                {brandsListState?.map((b, index) => {
                  const isSelected =
                    selectedBrands?.findIndex(
                      (item) => item?.slug == b?.attributes?.slug
                    ) !== -1;

                  return (
                    <div
                      key={"subCategories" + index}
                      className=" d-flex  "
                      onClick={() => handleBrandFilter(b?.attributes)}
                    >
                      <div className="clearAllCursor">
                        <div className={"col-10"}>
                          <p
                            className={`accordianOptionText ${
                              isSelected && "selected-sub-category"
                            }`}
                            style={{ width: "max-content" }}
                          >
                            {getLanguageBasedValue(
                              b?.attributes,
                              "name",
                              "",
                              router.locale
                            )}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="  closeIconSvg ml-5  mt-1 d-flex align-self-baseline clearAllCursor">
                          <CloseIconCircle color={"#0989FF"} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {brandsListState?.length > 11 && !loadMoreButtonState && (
                <div className="loadMoreButton">
                  <button
                    type="button"
                    onClick={getPaginationDataBrandsList}
                    class="btn controlFontLoadMoreButton"
                  >
                    {t("Load More")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      // <ul className="filter-items filter-checkbox">
      //   {all_brands?.map((b) => {
      //     const isSelected =
      //       selectedBrands?.findIndex(
      //         (item) => item?.slug == b?.attributes?.slug
      //       ) !== -1;
      //     return (
      //       <li key={b?.id} className="filter-item checkbox">
      //         <input
      //           type="checkbox"
      //           id={`brand-${b?.id}`}
      //           value={b?.id}
      //           checked={isSelected}
      //           onChange={() => handleBrandFilter(b?.attributes)}
      //         />{" "}
      //         <label className="form-check-label" htmlFor={`brand-${b.id}`}>
      //           {b?.attributes?.name}
      //         </label>
      //       </li>
      //     );
      //   })}
      // </ul>
    );
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        {/* <h3 className="tp-shop-widget-title">{t("Popular Brands")}</h3> */}

        <div className="tp-shop-widget-checkbox ">{content}</div>
      </div>
    </>
  );
};

export default ProductBrand;
