import React from "react";
import CNImage from "../CNImage";
import { useTranslations } from "next-intl";
import { getLanguageBasedValue } from "@/lib/get-language";
import { useRouter } from "next/router";

const DisplaySubCategories = ({
  subCategoriesData,
  selectedSubCategories,
  handleSubCategoryFilter,
  getPaginationDataSubCategoriesList,
  loadMoreButtonSubCategoriesState,
}) => {
  const t = useTranslations("header");
  const router = useRouter();
  return (
    <div className="subCategoriesParent pt-20">
      <div className=" mb-20  d-flex ">
        <div className="container">
          <div
            className=" d-flex  "
            style={{
              flexWrap: "wrap",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {subCategoriesData?.map((item, index) => {
              const isSelected =
                selectedSubCategories?.findIndex(
                  (val) => val?.slug == item?.attributes?.slug
                ) !== -1;
              const applyBorderStyles = isSelected
                ? "selectedSubCategoriesStyle"
                : "";
              const fontWeightBold = isSelected ? "textFontWeightBold" : "";
              return (
                <div
                  className={
                    "clearAllCursor manageWidthOfSubCategories imageWrapper changeColorOnHover d-flex align-items-center flex-column"
                  }
                  key={"subCategories" + item?.id}
                  onClick={() => handleSubCategoryFilter(item?.attributes)}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    <CNImage
                      src={item?.attributes?.logo?.data?.attributes?.url}
                      alt="category-image"
                      width={70}
                      height={70}
                      style={{
                        objectFit: "contain",
                        borderRadius: "50%",
                        height: "100%",
                        width: "100%",
                      }}
                      className={` ${applyBorderStyles}`}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <p
                      className={`SubcategoriesNamesUnderCircle ${fontWeightBold} `}
                    >
                      {getLanguageBasedValue(
                        item?.attributes,
                        "name",
                        "",
                        router.locale
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {subCategoriesData?.length >= 12 && !loadMoreButtonSubCategoriesState && (
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={getPaginationDataSubCategoriesList}
          >
            {t("Load More")}
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplaySubCategories;
