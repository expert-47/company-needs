import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";
import Link from "next/link";

const MobileCategory = ({
  categoryType,
  isCategoryActive,
  toggleCategoryDropdown,
  isError,
  isLoading,
}) => {
  const [isActiveSubMenu, setIsActiveSubMenu] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isCategoryActive) {
      setIsActiveSubMenu("");
    }
  }, [isCategoryActive]);
  const handleOpenSubMenu = (title) => {
    if (title === isActiveSubMenu) {
      setIsActiveSubMenu("");
    } else {
      setIsActiveSubMenu(title);
    }
  };
  const handleCategoryRoute = (categoryId, subCategoryId) => {
    let queryParams = "";
    if (categoryId) {
      queryParams += `&categoryId=${categoryId}`;
    }
    if (subCategoryId) {
      queryParams += `&subCategoryId=${subCategoryId}`;
    }
    toggleCategoryDropdown();
    router.push(`/products?${queryParams}`);
  };
  let content = null;
  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (!categoryType || categoryType?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  } else {
    content = categoryType?.map((item) => (
      <li
        className="has-dropdown"
        key={item?.id}
        style={{ direction: "ltr", textAlign: "start" }}
      >
        <a rel="noopener noreferrer" style={{ cursor: "pointer" }}>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => handleCategoryRoute(item?.id)}
          >
            {item?.attributes?.logo?.data?.attributes?.url && (
              <span className="pe-2">
                <Image
                  src={item?.attributes?.logo?.data?.attributes?.url}
                  alt="cate img"
                  width={20}
                  height={20}
                />
              </span>
            )}
            {item?.attributes?.name?.length > 20
              ? item?.attributes?.name?.slice(0, 20) + "..."
              : item?.attributes?.name}
          </button>
          {item?.attributes?.sub_categories && (
            <button
              onClick={() => handleOpenSubMenu(item?.attributes?.name)}
              className="dropdown-toggle-btn"
            >
              <i
                className={`fa ${
                  isActiveSubMenu === item?.attributes?.name
                    ? "fa-angle-down"
                    : "fa-angle-right"
                }`}
              ></i>
            </button>
          )}
        </a>

        {item?.attributes?.sub_categories && (
          <ul
            className={`tp-submenu ${
              isActiveSubMenu === item?.attributes?.name ? "active" : ""
            }`}
          >
            {item?.attributes?.sub_categories?.data?.map((child) => (
              <li
                key={child?.id}
                onClick={() => handleCategoryRoute(item?.id, child?.id)}
              >
                <a rel="noopener noreferrer" style={{ cursor: "pointer" }}>
                  {child?.attributes?.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ));
  }

  return (
    <ul
      style={{ overflow: "auto", height: "auto" }}
      className={isCategoryActive ? "active" : ""}
    >
      {content}
    </ul>
  );
};

export default MobileCategory;
