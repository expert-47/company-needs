import CNImage from "../CNImage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { getLanguageBasedValue } from "@/lib/get-language";

const OurShopPage = ({ categories }) => {
  const router = useRouter();
  const t = useTranslations("header");
  const [pageNumber, setPageNumber] = useState(2);
  const [loadMoreButtonState, setLoadMoreButtonState] = useState(false);
  const [categoriesListState, setCategoriesListState] = useState([
    ...categories,
  ]);

  const [categoriesList, { loading, error, data }] =
    useLazyQuery(CATEGORIES_LIST);

  const handleCategoryRoute = (categorySlug) => {
    router.push(`/category/${categorySlug}`);
  };

  const getPaginationData = async () => {
    let paginationFilters = {
      variables: {
        pagination: {
          page: pageNumber,
          pageSize: 14,
        },
      },
    };

    let response = await categoriesList(paginationFilters);
    setCategoriesListState([
      ...categoriesListState,
      ...response?.data?.categories?.data,
    ]);
    setPageNumber(pageNumber + 1);
    if (response?.data?.categories?.data?.length < 14) {
      setLoadMoreButtonState(true);
    }
  };

  return (
    <>
      <div className="pt-50 " id="categories">
        <div className="container d-flex justify-content-center ">
          <div className="row gy-4 d-flex justify-content-center ourShopPageCategoriesWidthController">
            {categoriesListState?.map((item) => {
              return (
                <>
                  <div
                    className="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-6  clearAllCursor changeColorOnHover   align-items-center d-flex flex-column "
                    style={{
                      padding: 0,
                    }}
                    onClick={() => handleCategoryRoute(item?.attributes?.slug)}
                  >
                    <div className="ourShopCategoryDimensionController">
                      <CNImage
                        src={item?.attributes?.logo?.data?.attributes?.url}
                        alt="category-image"
                        fill
                        quality={100}
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <p className="mt-2 mb-1 categoriesNamesUnderCircle  text-center">
                      {getLanguageBasedValue(
                        item?.attributes,
                        "name",
                        "",
                        router.locale
                      )}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {categories?.length >= 14 && !loadMoreButtonState && (
        <div className="mt-70 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary "
            onClick={getPaginationData}
            disabled={loadMoreButtonState}
          >
            {t("Load More")}
          </button>
        </div>
      )}
    </>
  );
};

export default OurShopPage;

//  <div
//    className="col-5 col-md-2 border rounded-circle mb-30  m-2 text-light d-flex flex-column justify-content-center align-items-center cursor-pointer semi-bold text-center managePaddingOfCircles"
//    style={{ backgroundColor: "var(--tp-theme-primary)" }}
//    onClick={() => handleCategoryRoute(item?.attributes?.slug)}
//  >
//    {item?.attributes?.name}
//    <p className="text-dark mb-0">
//      {item?.attributes?.sub_categories?.data?.length} Sub Categories
//    </p>
//  </div>;
