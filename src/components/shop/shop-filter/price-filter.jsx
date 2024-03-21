import InputRange from "@/ui/input-range";
import { useTranslations } from "next-intl";

const PriceFilter = ({ priceValue, handleChanges, maxPrice, handleFilterClick }) => {
  const t = useTranslations("header");

  return (
    <>
      <div className="tp-shop-widget mb-35">
        <h3 className="tp-shop-widget-title no-border">{t("Price Filter")}</h3>

        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-filter">
            <div id="slider-range" className="mb-10" style={{ direction: "ltr" }}>
              <InputRange
                STEP={1}
                MIN={0}
                MAX={maxPrice}
                values={priceValue}
                handleChanges={handleChanges}
              />
            </div>
            <div className="tp-shop-widget-filter-info d-flex align-items-center justify-content-between">
              <span className="input-range">
                SAR {priceValue[0]} - SAR {priceValue[1]}
              </span>
              <button className="tp-shop-widget-filter-btn" type="button" onClick={handleFilterClick}>
                {t("Filter")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
