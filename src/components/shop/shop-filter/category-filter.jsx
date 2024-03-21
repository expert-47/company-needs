/** @format */

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import ErrorMsg from "@/components/common/error-msg";
import CategoryListLoader from "@/components/loader/home/category-list-loader";
import CloseIconCircle from "@/svg/close-circle-icon";
import { getLanguageBasedValue } from "@/lib/get-language";
import { useRouter } from "next/router";

const CategoryComponent = ({
  handleCategoryFilter,
  handleSubCategoryFilter,
  selectedSubCategories,
  categoryItem,
  isSelectedCategory,
  index,
}) => {
  const [showSubCategories, setShowSubCategoreis] = useState(false);

  const router = useRouter();
  return (
    <>
      <div
        key={"subCategories" + index}
        className="d-flex align-items-center clearAllCursor"
        onClick={() => {
          if (
            categoryItem?.attributes?.sub_categories?.data &&
            categoryItem?.attributes?.sub_categories?.data?.length == 0
          ) {
            handleCategoryFilter(categoryItem?.attributes);
          } else setShowSubCategoreis(!showSubCategories);
          // handleCategoryFilter(categoryItem?.attributes?.slug)
        }}
      >
        <div className={"col-10"}>
          <p
            className={`accordianOptionText ${
              isSelectedCategory && "selected-sub-category"
            }`}
          >
            {getLanguageBasedValue(
              categoryItem?.attributes,
              "name",
              "",
              router.locale
            )}
          </p>
        </div>
        {isSelectedCategory && (
          <div className="  closeIconSvg ml-5  mt-1 d-flex align-self-baseline clearAllCursor">
            <CloseIconCircle color={"#0989FF"} />
          </div>
        )}
      </div>
      {showSubCategories &&
        categoryItem?.attributes?.sub_categories?.data?.length > 0 &&
        categoryItem.attributes?.sub_categories?.data?.map((subCategory) => {
          const isSelectedSubCategory =
            selectedSubCategories?.findIndex(
              (item) => item?.slug === subCategory?.attributes?.slug
            ) !== -1;
          selectedSubCategories.map((item) => {});
          return (
            <div
              key={`subcategory-${subCategory?.id}`}
              className=" d-flex ml-20"
              onClick={() =>
                handleSubCategoryFilter(subCategory?.attributes, categoryItem)
              }
            >
              <div className={"clearAllCursor"}>
                <p
                  className={`accordianOptionText managePaddingInArabic  ${
                    isSelectedSubCategory && "selected-sub-category"
                  }`}
                >
                  {getLanguageBasedValue(
                    subCategory?.attributes,
                    "name",
                    "",
                    router.locale
                  )}
                </p>
              </div>
              {isSelectedSubCategory && (
                <div className="  closeIconSvg ml-5  mt-1 d-flex align-self-baseline clearAllCursor">
                  <CloseIconCircle color={"#0989FF"} />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};
const CategoryFilter = (props) => {
  const { categoriesList, selectedCategories } = props;
  const [loadMoreButtonState, setLoadMoreButtonState] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);

  const t = useTranslations("header");

  const { data, loading, error } = useQuery(CATEGORIES_LIST);
  const [categoriesListQuery, {}] = useLazyQuery(CATEGORIES_LIST);

  const reorderedCategoriesList = categoriesList && [...categoriesList];
  const selectedCategoriesList =
    categoriesList &&
    reorderedCategoriesList.filter((categoryItem) =>
      selectedCategories.includes(categoryItem?.id)
    );
  const unselectedCategoriesList =
    categoriesList &&
    reorderedCategoriesList.filter(
      (categoryItem) => !selectedCategories.includes(categoryItem?.id)
    );
  const finalCategoriesList =
    categoriesList && selectedCategoriesList.concat(unselectedCategoriesList);

  const [categoriesListState, setCategoriesListState] = useState([
    ...finalCategoriesList,
  ]);

  let content = null;
  // if (!data) {
  //   content = <CategoryListLoader loading={true} />;
  // }
  const getPaginationDataCategoriesList = async () => {
    let paginationFilters = {
      variables: {
        pagination: {
          page: pageNumber,
          pageSize: 12,
        },
      },
    };

    let response = await categoriesListQuery(paginationFilters);
    setCategoriesListState([
      ...categoriesListState,
      ...response?.data?.categories?.data,
    ]);

    setPageNumber(pageNumber + 1);
    if (response?.data?.categories?.data?.length < 12) {
      setLoadMoreButtonState(true);
    }
  };

  if (data?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  } else {
    content = (
      <div
        class="accordion accordion-flush  accordianClassificationClass"
        id="accordianClassification"
        style={{ maxHeight: "220px" }}
      >
        <div class="accordion-item">
          <button
            class="accordion-button show"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            {t("Categories")}
          </button>

          <div className="box">
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse show accordianCollapseCategories"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordianClassification"
            >
              <div class="accordion-body row accordianBodayPadding">
                {categoriesListState?.map((categoryItem, index) => {
                  const isSelectedCategory =
                    selectedCategories.findIndex(
                      (item) => item?.slug == categoryItem?.attributes?.slug
                    ) !== -1;
                  return (
                    <>
                      <CategoryComponent
                        {...props}
                        categoryItem={categoryItem}
                        isSelectedCategory={isSelectedCategory}
                        index={index}
                      />
                    </>
                  );
                })}
              </div>
              {categoriesListState?.length > 11 && !loadMoreButtonState && (
                <div className="loadMoreButton">
                  <button
                    type="button"
                    onClick={getPaginationDataCategoriesList}
                    class="btn controlFontLoadMoreButton"
                    disabled={loadMoreButtonState}
                  >
                    {t("Load More")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default CategoryFilter;
