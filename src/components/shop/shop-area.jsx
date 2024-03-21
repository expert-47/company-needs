/** @format */

//package imports
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
//query
import { PRODUCTS_DATA } from "@/graphql/query/products";
import { ALL_BRANDS_DATA } from "@/graphql/query/brands";

//components imports
import Pagination from "@/ui/Pagination";
import ShopTopLeft from "./shop-top-left";
import ShopListItem from "./shop-list-item";
import ShopTopRight from "./shop-top-right";
import useLoadingState from "@/hooks/use-loading";
import ProductItem from "../products/product-item";

import ProductBrand from "./shop-filter/product-brand";
import DisplaySubCategories from "./displaySubCategories";
import SearchPrdLoader from "../loader/search-prd-loader";
import CategoryFilter from "./shop-filter/category-filter";
import ShopFilterOffCanvas from "../common/shop-filter-offcanvas";
//assets
import CloseIconCircle from "@/svg/close-circle-icon";
import { SUB_CATEGORIES_LIST } from "@/graphql/query/shop";
import { getLanguageBasedValue } from "@/lib/get-language";

const ShopArea = ({
  all_products,

  otherProps,
  categories,
  subCategories,
  all_brands,
  accordian,
  subCategoriesData,
}) => {
  const t = useTranslations("header");
  const [pageSize, setPageSize] = useState(12);
  const sortFiltersData = [
    { value: "Relevance", label: t("Relevance") },
    { value: "Low to High", label: t("Price, low to High") },
    { value: "High to Low", label: t("Price, high to Low") },
    { value: "isTrending", label: t("New Arrival") },
  ];
  const pageSizeData = [
    { value: 12, label: `12 ${t("per page")}` },
    { value: 24, label: `24 ${t("per page")}` },
    { value: 48, label: `48 ${t("per page")}` },
  ];
  const router = useRouter();

  const getFLiter = (_selectValue) => {
    if (_selectValue === "Low to High") {
      return { sort: "price:asc" };
    } else if (_selectValue === "High to Low") {
      return { sort: "price:desc" };
    } else if (_selectValue === "isTrending") {
      return {
        filters: {
          isTrending: {
            eq: true,
          },
        },
      };
    }
    return { sort: "updatedAt:desc" };
  };
  const [pagenationData, setPageNationData] = useState({
    page: 1,
    isNextExist: all_products?.length == pageSize ? true : false,
    isVisible: true,
  });

  const [searchProducts, { loading, error, data }] =
    useLazyQuery(PRODUCTS_DATA);
  const [categoriesBrandQuery, {}] = useLazyQuery(ALL_BRANDS_DATA);
  const [SubcategoriesQuery, {}] = useLazyQuery(SUB_CATEGORIES_LIST);

  const isLoading = useLoadingState();

  const [selectValue, setSelectValue] = useState("Relevance");
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [filteredRows, setFilteredRows] = useState(all_products);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(2);
  const [loadMoreButtonState, setLoadMoreButtonState] = useState(false);
  const [brandsListState, setBrandsListState] = useState([...all_brands]);
  const [pageNumberSubCategories, setPageNumberSubCategories] = useState(2);
  const [
    loadMoreButtonSubCategoriesState,
    setLoadMoreSubCategoriesButtonState,
  ] = useState(false);
  const [subCategoriesListState, setSubCategoriesListState] = useState(
    Array.isArray(subCategoriesData) ? [...subCategoriesData] : []
  );

  useEffect(() => {
    if (router?.query?.filter)
      handleSortingFilter(router?.query?.filter.replace(/-/g, " "));
  }, []);

  const getPaginationDataSubCategoriesList = async () => {
    let paginationFilters = {
      variables: {
        pagination: {
          page: pageNumberSubCategories,
          pageSize: 12,
        },
        filters: {
          category: {
            slug: {
              eq: router.query.id || null,
            },
          },
        },
      },
    };

    let response = await SubcategoriesQuery(paginationFilters);

    setSubCategoriesListState([
      ...subCategoriesListState,
      ...response?.data?.subCategories?.data,
    ]);

    setPageNumberSubCategories(pageNumberSubCategories + 1);
    if (response?.data?.subCategories?.data?.length < 12) {
      setLoadMoreSubCategoriesButtonState(true);
    }
  };

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

  // handleCategoryFilter
  const handleCategoryFilter = async (category) => {
    try {
      let updatedCategories = [...selectedCategories];
      let selectedSubs = [];
      if (
        updatedCategories.findIndex((item) => item?.slug == category?.slug) !==
        -1
      ) {
        updatedCategories = updatedCategories.filter(
          (item) => item?.slug !== category?.slug
        );
        selectedSubs = [...selectedSubCategories];
        categories
          .find((item) => item.attributes?.slug === category?.slug)
          .attributes.sub_categories.data.map((subCategory) => {
            selectedSubs = selectedSubs.filter(
              (item) => item?.slug !== subCategory?.attributes?.slug
            );
          });
      } else {
        updatedCategories.push(category);
        selectedSubs = [...selectedSubCategories];
      }
      setSelectedCategories(updatedCategories);
      setSelectedSubCategories(selectedSubs);
      let newData = {
        variables: {
          filters: {},
          pagination: {
            limit: 100,
          },
        },
      };
      if (updatedCategories?.length > 0) {
        newData.variables.filters.category = {
          slug: {
            in: updatedCategories?.map((item) => item?.slug),
          },
        };
      }
      if (selectedSubs.length > 0) {
        newData.variables.filters.sub_category = {
          slug: {
            in: selectedSubs?.map((item) => item?.slug),
          },
        };
      }

      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          slug: {
            in: selectedBrands?.map((item) => item?.slug),
          },
        };
      }
      let filters = getFLiter(selectValue);
      newData.variables = { ...newData.variables, ...filters };

      let response = await searchProducts(newData);
      if (response.data.products.data) {
        const cateoryfilteredProducts = response.data.products.data;

        setFilteredRows(cateoryfilteredProducts);

        // set pagination
        setPageNationData({
          isVisible: cateoryfilteredProducts?.length == pageSize,
          page: 1,
          isNextExist: cateoryfilteredProducts?.length == pageSize,
        });
      } else {
        setFilteredRows([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // subCategory Filter
  const handleSubCategoryFilter = async (subCategory, categoryItem) => {
    try {
      let updatedSubCategories = [...selectedSubCategories];
      if (
        updatedSubCategories &&
        updatedSubCategories?.findIndex(
          (item) => item?.slug == subCategory?.slug
        ) !== -1
      ) {
        updatedSubCategories = updatedSubCategories.filter(
          (item) => item?.slug !== subCategory?.slug
        );
      } else {
        updatedSubCategories.push({ ...subCategory, categoryItem });
      }

      let _selectedCategories = [...selectedCategories];
      if (!accordian) {
        let tempSubCategories = updatedSubCategories.map((item) => item?.slug);
        if (
          categoryItem &&
          categoryItem?.attributes?.sub_categories?.data?.filter((item) =>
            tempSubCategories.includes(item?.attributes?.slug)
          )?.length == 0
        ) {
          _selectedCategories = _selectedCategories.filter(
            (item) => item?.slug !== categoryItem?.attributes?.slug
          );
          setSelectedCategories(_selectedCategories);
        } else {
          if (
            _selectedCategories.findIndex(
              (item) => item?.slug == categoryItem?.attributes?.slug
            ) == -1 &&
            categoryItem?.attributes?.slug
          ) {
            setSelectedCategories(
              _selectedCategories.concat(categoryItem?.attributes)
            );
          }
        }
      }
      setSelectedSubCategories(updatedSubCategories);

      let newData = {
        variables: {
          filters: {},
          pagination: {
            pageSize,
            page: 1,
          },
        },
      };

      if (accordian) {
        newData.variables.filters.category = {
          slug: {
            eq: router?.query?.id || null,
          },
        };
      } else if (_selectedCategories?.length > 0) {
        newData.variables.filters.category = {
          slug: {
            in: _selectedCategories?.map((item) => item?.slug),
          },
        };
      }

      if (updatedSubCategories?.length > 0) {
        newData.variables.filters.sub_category = {
          slug: {
            in: updatedSubCategories?.map((item) => item?.slug),
          },
        };
      }

      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          id: {
            in: selectedBrands,
          },
        };
      }
      let filters = getFLiter(selectValue);
      newData.variables = { ...newData.variables, ...filters };

      let response = await searchProducts(newData);
      if (response.data.products.data) {
        const productsdata = response.data.products.data;

        setFilteredRows(productsdata);
        // set pagination
        setPageNationData({
          isVisible: productsdata?.length == pageSize,
          page: 1,
          isNextExist: productsdata?.length == pageSize,
        });
      } else {
        setFilteredRows([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // Handle Price filter
  const handleChanges = (val) => {};
  // handlePriceFilter
  const handlePriceFilter = async () => {
    try {
      let newData = {
        variables: {
          filters: {},
          pagination: {
            pageSize,
            page: 1,
          },
        },
      };

      if (selectedCategories?.length > 0) {
        newData.variables.filters.category = {
          slug: {
            in: selectedCategories?.map((item) => item?.slug),
          },
        };
      }
      if (selectedSubCategories.length > 0) {
        newData.variables.filters.sub_category = {
          slug: {
            in: selectedSubCategories?.map((item) => item?.slug),
          },
        };
      }

      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          slug: {
            in: selectedBrands?.map((item) => item?.slug),
          },
        };
      }
      let filters = getFLiter(selectValue);
      newData.variables = { ...newData.variables, ...filters };
      let response = await searchProducts(newData);

      if (response.data.products.data) {
        const productsdata = response.data.products.data;

        setFilteredRows(productsdata);
        // set pagination
        setPageNationData({
          isVisible: productsdata?.length == pageSize,
          page: 1,
          isNextExist: productsdata?.length == pageSize,
        });
      } else {
        setFilteredRows([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // handleBrandFilter
  const handleBrandFilter = async (brand) => {
    try {
      let updatedSelectedBrands = [...selectedBrands];

      if (
        updatedSelectedBrands &&
        updatedSelectedBrands?.findIndex(
          (item) => item?.slug == brand?.slug
        ) !== -1
      ) {
        updatedSelectedBrands = updatedSelectedBrands?.filter(
          (item) => item?.slug !== brand?.slug
        );
      } else {
        updatedSelectedBrands.push(brand);
      }
      setSelectedBrands(updatedSelectedBrands);
      let newData = {
        variables: {
          filters: {},
          pagination: {
            pageSize,
            page: 1,
          },
        },
      };

      if (accordian) {
        newData.variables.filters.category = {
          slug: {
            eq: router?.query?.id || null,
          },
        };
      } else if (selectedCategories?.length > 0) {
        newData.variables.filters.category = {
          slug: {
            in: selectedCategories?.map((item) => item?.slug),
          },
        };
      }

      if (selectedSubCategories.length > 0) {
        newData.variables.filters.sub_category = {
          slug: {
            in: selectedSubCategories?.map((item) => item?.slug),
          },
        };
      }

      if (updatedSelectedBrands?.length > 0) {
        newData.variables.filters.brands = {
          slug: {
            in: updatedSelectedBrands?.map((item) => item?.slug),
          },
        };
      }
      let filters = getFLiter(selectValue);
      newData.variables = { ...newData.variables, ...filters };

      let response = await searchProducts(newData);
      if (response.data.products.data) {
        const productsdata = response?.data?.products?.data;

        setFilteredRows(productsdata);

        // set pagination
        setPageNationData({
          isVisible: productsdata?.length == pageSize,
          page: 1,
          isNextExist: productsdata?.length == pageSize,
        });
      } else {
        setFilteredRows([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // handleSortingFilter
  const handleSortingFilter = async (selectValue) => {
    try {
      setSelectValue(selectValue);
      let newData = {
        variables: {
          filters: {},
          pagination: {
            pageSize,
            page: 1,
          },
        },
      };
      if (selectedCategories?.length > 0) {
        newData.variables.filters.category = {
          slug: {
            in: selectedCategories?.map((item) => item?.slug),
          },
        };
      }
      if (selectedSubCategories.length > 0) {
        newData.variables.filters.sub_category = {
          slug: {
            in: selectedSubCategories?.map((item) => item?.slug),
          },
        };
      }

      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          slug: {
            in: selectedBrands?.map((item) => item?.slug),
          },
        };
      }

      let filters = getFLiter(selectValue);
      newData.variables = { ...newData.variables, ...filters };
      let response = await searchProducts(newData);
      if (response.data.products.data) {
        const productsdata = response.data.products.data;

        setFilteredRows(productsdata);

        const newUrl = `${router.asPath}?filter=${selectValue.replace(
          / /g,
          "-"
        )}`;

        window.history.replaceState({}, "", newUrl);

        // set pagination
        setPageNationData({
          isVisible: productsdata?.length == pageSize,
          page: 1,
          isNextExist: productsdata?.length == pageSize,
        });
      } else {
        setFilteredRows([]);
      }
      if (selectValue === "Relevance") {
        const newUrl = router.asPath;
        window.history.replaceState({}, "", newUrl);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Reset filter
  const handleResetFilters = async () => {
    try {
      setSelectedCategories([]);
      setSelectedSubCategories([]);
      setSelectValue("Relevance");
      setSelectedBrands([]);

      const initialData = {
        variables: {
          filters: {},
          pagination: {
            pageSize,
            page: 1,
          },
          sort: "updatedAt:desc",
        },
      };
      if (accordian && router?.query?.id) {
        initialData.variables.filters.category = {
          slug: {
            eq: router?.query?.id || null,
          },
        };
      }

      let response = await searchProducts(initialData);

      if (response.data.products.data) {
        const initialProducts = response.data.products.data;

        setFilteredRows(initialProducts);
        // set pagination
        setPageNationData({
          isVisible: initialProducts?.length == pageSize,
          page: 1,
          isNextExist: initialProducts?.length == pageSize,
        });
      } else {
        setFilteredRows([]);

        if (!accordian) {
          const newUrl = `${router.asPath}`;
          window.history.replaceState({}, "", newUrl);
        }
      }
      if (accordian) {
        const newUrl = `${router.asPath}`;
        window.history.replaceState({}, "", newUrl);
      }
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  };
  // paginatedData
  const paginatedData = (index) => {};

  const goToPage = async (
    page,
    isVisibleDefault = false,
    pageSizeDefault = -1
  ) => {
    try {
      let _pageSize = pageSizeDefault !== -1 ? pageSizeDefault : pageSize;
      // console.log("valll", _pageSize);
      let newData = {
        variables: {
          filters: {},
          pagination: { pageSize: _pageSize, page },
        },
      };

      if (accordian) {
        newData.variables.filters.category = {
          slug: {
            eq: router?.query?.id || null,
          },
        };
      } else if (selectedCategories?.length > 0) {
        newData.variables.filters.category = {
          slug: {
            in: selectedCategories?.map((item) => item?.slug),
          },
        };
      }

      if (selectedSubCategories?.length > 0) {
        newData.variables.filters.sub_category = {
          slug: {
            in: selectedSubCategories?.map((item) => item?.slug),
          },
        };
      }

      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          id: {
            in: selectedBrands,
          },
        };
      }
      let filters = getFLiter(selectValue);
      newData.variables = { ...newData.variables, ...filters };

      const response = await searchProducts(newData);
      const productsdata = response?.data?.products?.data;

      if (productsdata) {
        setFilteredRows(productsdata);
        // set pagination
        setPageNationData((prv) => ({
          isVisible: isVisibleDefault || prv.isVisible,
          page,
          isNextExist: productsdata?.length == _pageSize,
        }));
      } else {
        setFilteredRows([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlePageSizeFilter = (val) => {
    setPageSize(Number(val));

    goToPage(1, true, Number(val));
  };
  return (
    <>
      <section
        className="tp-shop-area"
        style={{
          overflowX: "hidden",
        }}
      >
        <div className="container">
          {accordian && (
            <DisplaySubCategories
              subCategoriesData={subCategoriesListState}
              selectedSubCategories={selectedSubCategories}
              handleSubCategoryFilter={handleSubCategoryFilter}
              getPaginationDataSubCategoriesList={
                getPaginationDataSubCategoriesList
              }
              loadMoreButtonSubCategoriesState={
                loadMoreButtonSubCategoriesState
              }
            />
          )}
          {!accordian ? (
            <div className="row">
              <div className=" d-lg-block">
                {/* <ResetButton handleResetFilters={handleResetFilters} /> */}
                <div className="d-flex flex-column flex-sm-row-reverse justify-content-between align-items-sm-center ">
                  <div className="tp-shop-top ">
                    <div className="d-flex flex-column-reverse flex-sm-row justify-content-end align-items-end">
                      <div className="d-flex flex-row">
                        <div className="margin-right-custom">
                          <ShopTopRight
                            handleSortingFilter={handlePageSizeFilter}
                            selectValue={pageSize}
                            data={pageSizeData}
                          />
                        </div>
                        <div className="margin-right-custom">
                          <ShopTopRight
                            handleSortingFilter={handleSortingFilter}
                            selectValue={selectValue}
                            data={sortFiltersData}
                          />
                        </div>
                      </div>

                      <div className="">
                        <ShopTopLeft
                          showing={pagenationData.page}
                          total={pagenationData?.total}
                          startIndex={
                            pagenationData.page == 1
                              ? 1
                              : pagenationData.page * 12 + 1
                          }
                          endIndex={pagenationData.page * 12}
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="tp-footer-widget-title pt-10">
                    {t("Narrow by")}
                  </h4>
                </div>

                <span
                  className="d-flex align-items-center w-100 clearAllCursor"
                  onClick={handleResetFilters}
                >
                  <p>{t("Clear All")}</p>
                  <div className="closeIconSvg ml-15 mt-1 d-flex align-self-baseline">
                    <CloseIconCircle />
                  </div>
                </span>
                <div className="tp-shop-sidebar d-flex ">
                  {categories && (
                    <CategoryFilter
                      categoriesList={categories}
                      subCategoriesList={subCategories}
                      selectedCategories={selectedCategories}
                      handleCategoryFilter={handleCategoryFilter}
                      selectedSubCategories={selectedSubCategories}
                      handleSubCategoryFilter={handleSubCategoryFilter}
                    />
                  )}

                  <ProductBrand
                    all_brands={all_brands}
                    handleBrandFilter={handleBrandFilter}
                    selectedBrands={selectedBrands}
                  />
                </div>
              </div>
              <div
                className="d-flex mb-10 "
                style={{
                  height: "fit-content",
                  alignItems: "baseline",
                }}
              >
                {(selectedSubCategories?.length > 0 ||
                  selectedCategories?.length > 0 ||
                  selectedBrands?.length > 0) && (
                  <h6 className="manageMarginFilter">{t("Filtered By")}</h6>
                )}
                <div className=" row d-flex managePaddingInArabic">
                  {selectedSubCategories?.length > 0 &&
                    selectedSubCategories?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={"subCategories" + index}
                            className="d-flex align-items-center align-self-baseline clearAllCursor manageMarginFilterLeft filtersWidth"
                            onClick={() =>
                              handleSubCategoryFilter(item, item?.categoryItem)
                            }
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <div>
                              <p
                                style={{
                                  whiteSpace: "nowrap",
                                  marginRight: "13px",
                                }}
                              >
                                {getLanguageBasedValue(
                                  item,
                                  "name",
                                  "",
                                  router.locale
                                )}
                              </p>
                            </div>

                            <div className=" closeIconSvg mt-1 ml-5 d-flex align-self-baseline">
                              <CloseIconCircle color={"black"} />
                            </div>
                          </div>
                        </>
                      );
                    })}

                  {selectedBrands?.map((item, index) => {
                    return (
                      <>
                        <div
                          key={"subCategories" + index}
                          className="d-flex align-items-center align-self-baseline clearAllCursor manageMarginFilterLeft filtersWidth"
                          onClick={() => handleBrandFilter(item)}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <div>
                            <p>
                              {getLanguageBasedValue(
                                item,
                                "name",
                                "",
                                router.locale
                              )}
                            </p>
                          </div>

                          <div className=" closeIconSvg ml-5  mt-1 d-flex align-self-baseline">
                            <CloseIconCircle color={"black"} />
                          </div>
                        </div>
                      </>
                    );
                  })}
                  {selectedCategories?.length > 0 &&
                    selectedCategories?.map((item, index) => {
                      return (
                        <div
                          key={"Categories" + index}
                          className="d-flex align-items-center align-self-baseline clearAllCursor manageMarginFilterLeft filtersWidth"
                          onClick={() => handleCategoryFilter(item)}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <div>
                            <p>
                              {getLanguageBasedValue(
                                item,
                                "name",
                                "",
                                router.locale
                              )}
                            </p>
                          </div>

                          <div className="closeIconSvg   mt-1  d-flex align-self-baseline">
                            <CloseIconCircle color={"black"} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex flex-column flex-sm-row-reverse justify-content-between align-items-sm-center ">
                <div className="tp-shop-top ">
                  <div className="d-flex flex-column-reverse flex-sm-row justify-content-end align-items-end">
                    <div className="d-flex flex-row">
                      <div className="margin-right-custom">
                        <ShopTopRight
                          handleSortingFilter={handlePageSizeFilter}
                          selectValue={pageSize}
                          data={pageSizeData}
                        />
                      </div>
                      <div className="margin-right-custom">
                        <ShopTopRight
                          handleSortingFilter={handleSortingFilter}
                          selectValue={selectValue}
                          data={sortFiltersData}
                        />
                      </div>
                    </div>

                    <div className="">
                      <ShopTopLeft
                        showing={pagenationData.page}
                        total={pagenationData?.total}
                        startIndex={
                          pagenationData.page == 1
                            ? 1
                            : pagenationData.page * 12 + 1
                        }
                        endIndex={pagenationData.page * 12}
                      />
                    </div>
                  </div>
                </div>
                <h4 className="tp-footer-widget-title pt-10">
                  {t("Narrow by")}
                </h4>
              </div>

              <span
                className="d-flex align-items-center w-100 clearAllCursor"
                onClick={handleResetFilters}
              >
                <p>{t("Clear All")}</p>
                <div className="closeIconSvg ml-15 mt-1 d-flex align-self-baseline">
                  <CloseIconCircle />
                </div>
              </span>

              <div class=" d-md-flex flex-md-row flex-column">
                <div
                  class="accordion accordion-flush"
                  id="accordianClassification"
                  style={{ maxHeight: "220px" }}
                >
                  <div class="accordion-item">
                    <button
                      class="accordion-button show"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseCategories"
                      aria-expanded="false"
                      aria-controls="flush-collapseCategories"
                    >
                      {t("CLASSIFICATION")}
                    </button>

                    <div className="box">
                      <div
                        id="flush-collapseCategories"
                        class="accordion-collapse collapse show accordianCollapseCategories"
                        aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordianClassification"
                      >
                        <div class="accordion-body row accordianBodayPadding">
                          {subCategoriesListState?.map((item, index) => {
                            const isSelected =
                              selectedSubCategories?.findIndex(
                                (val) => val?.slug == item?.attributes?.slug
                              ) !== -1;

                            return (
                              <div
                                key={"subCategories" + index}
                                className="d-flex align-items-center clearAllCursor"
                                onClick={() =>
                                  handleSubCategoryFilter(item?.attributes)
                                }
                              >
                                <div className={"col-10"}>
                                  <p
                                    className={`accordianOptionText ${
                                      isSelected && "selected-sub-category"
                                    }`}
                                  >
                                    {getLanguageBasedValue(
                                      item?.attributes,
                                      "name",
                                      "",
                                      router.locale
                                    )}
                                  </p>
                                </div>

                                {isSelected && (
                                  <div className=" col-2 closeIconSvg  mt-1 d-flex align-self-baseline">
                                    <CloseIconCircle color={"#0989FF"} />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {subCategoriesListState?.length > 11 &&
                          !loadMoreButtonSubCategoriesState && (
                            <div className="loadMoreButton">
                              <button
                                type="button"
                                onClick={getPaginationDataSubCategoriesList}
                                class="btn controlFontLoadMoreButton"
                                disabled={loadMoreButtonSubCategoriesState}
                              >
                                {t("Load More")}
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="accordion accordion-flush"
                  id="accordianBrand"
                  style={{ maxHeight: "220px" }}
                >
                  <div class="accordion-item">
                    <button
                      class="accordion-button show"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#accordianAreaTargetBrand"
                      aria-expanded="false"
                      aria-controls="accordianAreaTargetBrand"
                    >
                      {t("Brand")}
                    </button>

                    <div className="box">
                      <div
                        id="accordianAreaTargetBrand"
                        class="accordion-collapse collapse show accordianCollapseBrand"
                        aria-labelledby="accordianBrandHeading"
                        data-bs-parent="#accordianBrand"
                      >
                        <div class="accordion-body row accordianBodayPadding card-body">
                          {brandsListState?.map((item, index) => {
                            const isSelected =
                              selectedBrands?.findIndex(
                                (val) => val?.slug == item?.attributes?.slug
                              ) !== -1;
                            return (
                              <div
                                key={"subCategories" + index}
                                className="d-flex align-items-center clearAllCursor"
                                onClick={() =>
                                  handleBrandFilter(item?.attributes)
                                }
                              >
                                <div className="col-10">
                                  <p
                                    className={`accordianOptionText ${
                                      isSelected && "selected-sub-category"
                                    }`}
                                  >
                                    {getLanguageBasedValue(
                                      item?.attributes,
                                      "name",
                                      "",
                                      router.locale
                                    )}
                                  </p>
                                </div>

                                {isSelected && (
                                  <div className=" col-2 closeIconSvg  mt-1 d-flex align-self-baseline">
                                    <CloseIconCircle color={"#0989FF"} />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {brandsListState?.length > 11 &&
                          !loadMoreButtonState && (
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
              </div>
              <div className="d-flex mt-10 align-items-baseline ">
                {(selectedSubCategories?.length > 0 ||
                  selectedBrands?.length > 0) && (
                  <h6 className="manageMarginFilter">{t("Filtered By")}</h6>
                )}
                <div className="row d-flex">
                  {subCategoriesData?.map((item, index) => {
                    const isSelected =
                      selectedSubCategories?.findIndex(
                        (val) => val?.slug === item?.attributes?.slug
                      ) !== -1;

                    return (
                      <>
                        {isSelected && (
                          <div
                            key={"subCategories" + index}
                            className="d-flex align-items-center align-self-baseline clearAllCursor justify-content-around filtersWidth"
                            onClick={() =>
                              handleSubCategoryFilter(item?.attributes)
                            }
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div>
                              <p
                                style={{
                                  whiteSpace: "nowrap",
                                  marginRight: "13px",
                                }}
                              >
                                {getLanguageBasedValue(
                                  item?.attributes,
                                  "name",
                                  "",
                                  router.locale
                                )}
                              </p>
                            </div>

                            <div className=" closeIconSvg mt-1 ml-5 d-flex align-self-baseline">
                              <CloseIconCircle color={"black"} />
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}

                  {all_brands?.map((item, index) => {
                    const isSelected =
                      selectedBrands?.findIndex(
                        (val) => val?.slug == item?.attributes?.slug
                      ) !== -1;
                    return (
                      <>
                        {isSelected && (
                          <div
                            key={"subCategories" + index}
                            className="d-flex align-items-center align-self-baseline clearAllCursor manageMarginFilterLeft filtersWidth"
                            onClick={() => handleBrandFilter(item?.attributes)}
                          >
                            <div>
                              <p>
                                {getLanguageBasedValue(
                                  item?.attributes,
                                  "name",
                                  "",
                                  router.locale
                                )}
                              </p>
                            </div>

                            <div className=" closeIconSvg  mt-1 ml-5 d-flex align-self-baseline">
                              <CloseIconCircle color={"black"} />
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          <div className="col-12">
            {isLoading || loading ? (
              <div>
                <SearchPrdLoader />
              </div>
            ) : (
              <div className="tp-shop-main-wrapper">
                {filteredRows.length === 0 || filteredRows.length === 0 ? (
                  <h2>No products found</h2>
                ) : null}
              </div>
            )}
          </div>
          {filteredRows.length > 0 && (
            <div className="tp-shop-items-wrapper tp-shop-item-primary mt-20">
              <div className="tab-content" id="productTabContent">
                <div
                  className="tab-pane fade"
                  id="list-tab-pane"
                  role="tabpanel"
                  aria-labelledby="list-tab"
                  tabIndex="0"
                >
                  <div className="tp-shop-list-wrapper tp-shop-item-primary mb-70">
                    <div className=" d-flex flex-wrap">
                      {filteredRows.map((item, index) => (
                        <div className="col-xl-12 mb-10 w-100">
                          <ShopListItem
                            key={`${item.id}-${index}`}
                            product={item}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="double-tab-pane"
                  role="tabpanel"
                  aria-labelledby="double-tab"
                  tabIndex="0"
                >
                  <div className="tp-shop-list-wrapper tp-shop-item-primary mb-70">
                    <div className=" d-flex flex-wrap">
                      {filteredRows.map((item, index) => (
                        <div className="col-xl-6 productCardWidth">
                          <ShopListItem
                            key={`${item.id}-${index}`}
                            product={item}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade show active"
                  id="grid-tab-pane"
                  role="tabpanel"
                  aria-labelledby="grid-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    {filteredRows.map((item, index) => (
                      <div
                        key={`product_item ${index}`}
                        className="col-lg-3 col-md-4 col-sm-12"
                        // spacingBetweenProducts
                      >
                        <ProductItem product={item} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {pagenationData?.isVisible ? (
            <div className="tp-shop-pagination mt-20">
              <div
                className="tp-pagination d-flex justify-content-center"
                style={{ direction: "ltr" }}
              >
                <Pagination
                  goToPage={goToPage}
                  pagenationData={pagenationData}
                  currentPage={pagenationData?.page || 1}
                  totalPage={
                    pagenationData.isNextExist
                      ? pagenationData?.page + 1
                      : pagenationData?.page
                  }
                />
              </div>
            </div>
          ) : null}
        </div>
        <ShopFilterOffCanvas
          _all_products={all_products}
          otherProps={otherProps}
          categories={categories}
          subCategories={subCategories}
          all_brands={all_brands}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          handleCategoryFilter={handleCategoryFilter}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
          handleSubCategoryFilter={handleSubCategoryFilter}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          handleBrandFilter={handleBrandFilter}
          handleChanges={handleChanges}
          handlePriceFilter={handlePriceFilter}
          handleSortingFilter={handleSortingFilter}
          handleResetFilters={handleResetFilters}
          paginatedData={paginatedData}
          accordian={accordian}
        />
      </section>
    </>
  );
};

export default ShopArea;
