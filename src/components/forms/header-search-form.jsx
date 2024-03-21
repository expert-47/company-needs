import { useState } from "react";
// internal
import { Search } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const HeaderSearchForm = () => {
  const { setSearchText, setCategory, handleSubmit, searchText } =
    useSearchFormSubmit();
  const t = useTranslations("header");
  // selectHandle
  const selectCategoryHandle = (e) => {
    setCategory(e.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="tp-header-search-wrapper d-flex align-items-center">
        <div className="tp-header-search-box">
          <input
            defaultValue={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            placeholder={t("Search for Products")}
          />
        </div>
        <div className="tp-header-search-btn">
          <button type="submit" aria-label="Search Products">
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeaderSearchForm;
