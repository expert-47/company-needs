import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopColorLoader from "@/components/loader/shop/color-filter-loader";

const ColorFilter = ({
  subCategoriesList,
  setCurrPage,
  shop_right = false,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // handle category route
  const handleCategoryRoute = (title) => {
    setCurrPage(1);
    router.push(
      `/${shop_right ? "shop-right-sidebar" : "shop"}?category=${title
        .toLowerCase()
        .replace("&", "")
        .split(" ")
        .join("-")}`
    );
    dispatch(handleFilterSidebarClose());
  };

  // decide what to render
  let content = null;

  if (subCategoriesList === undefined) {
    content = <ShopColorLoader />;
  } else if (subCategoriesList.length === 0) {
    content = <ErrorMsg msg="No Sub Categories found!" />;
  } else {
    content = subCategoriesList.map((item) => (
      <li key={item.attributes.name}>
        <a
          rel="noopener noreferrer"
          onClick={() => handleCategoryRoute(item.attributes.name)}
          style={{ cursor: "pointer" }}
          className={
            router.query.category ===
            item.attributes.name
              .toLowerCase()
              .replace("&", "")
              .split(" ")
              .join("-")
              ? "active"
              : ""
          }
        >
          <span>{item.attributes.name}</span>
        </a>
      </li>
    ));
  }

  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Sub Categories</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorFilter;
