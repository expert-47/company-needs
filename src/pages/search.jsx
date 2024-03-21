import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import ErrorMsg from "@/components/common/error-msg";
import SearchPrdLoader from "@/components/loader/search-prd-loader";
import ProductItem from "@/components/products/product-item";
import SEO from "@/components/seo";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchPage({ category, footerLinks, searchQuery }) {
  const t = useTranslations("header");
  const { searchText: searchTexts, productType } = searchQuery;
  const { products, isError, isLoading } = useProductsQuery();
  const [shortValue, setShortValue] = useState("");
  const perView = 12;
  const [next, setNext] = useState(perView);
  const router = useRouter();
  const { query } = router;
  const searchTextFromQuery = query.searchText || "";
  const [searchText, setSearchText] = useState(searchTextFromQuery);

  useEffect(() => {
    setSearchText(searchTexts || searchTextFromQuery); // Set searchText in the input field
  }, [searchTextFromQuery]);
  const shortHandler = (e) => {
    setShortValue(e.value);
  };
  const handleLoadMore = () => {
    setNext((value) => value + 8);
  };
  let content = null;
  if (isLoading) {
    content = <SearchPrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <SearchPrdLoader loading={isLoading} />;
  }
  if (!isLoading && !isError && products?.length > 0) {
    let all_products = products;
    let product_items = all_products;
    if (searchText && !productType) {
      product_items = all_products.filter((prd) =>
        prd.attributes?.title?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (searchText && productType) {
      product_items = all_products
        .filter(
          (prd) =>
            prd.attributes?.productType?.toLowerCase() ===
            productType.toLowerCase()
        )
        .filter((p) =>
          p.attributes?.title?.toLowerCase().includes(searchText.toLowerCase())
        );
    }
    if (shortValue === "Price low to high") {
      product_items = product_items
        .slice()
        .sort(
          (a, b) => Number(a.attributes.price) - Number(b.attributes.price)
        );
    }
    if (shortValue === "Price high to low") {
      product_items = product_items
        .slice()
        .sort(
          (a, b) => Number(b.attributes.price) - Number(a.attributes.price)
        );
    }
    if (product_items.length === 0) {
      content = (
        <div className="text-center pt-80 pb-80">
          <h3>
            {t("Sorry, nothing matched")}{" "}
            <span style={{ color: "#0989FF" }}>{searchText}</span>{" "}
            {t("search terms")}
          </h3>
        </div>
      );
    } else {
      content = (
        <>
          <section className="tp-shop-area pb-120">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="tp-shop-main-wrapper">
                    <div className="tp-shop-top mb-45">
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="tp-shop-top-left d-flex align-items-center ">
                            <div className="tp-shop-top-result">
                              <p>
                                {t("Showing")} 1–{product_items.length}{" "}
                                {t("of")} {all_products.length} {t("results")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tp-shop-items-wrapper tp-shop-item-primary">
                      <div className="row">
                        {product_items.slice(0, next)?.map((item) => (
                          <div
                            key={item._id}
                            className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                          >
                            <ProductItem product={item} />
                          </div>
                        ))}
                      </div>
                    </div>
                    {next < product_items?.length && (
                      <div className="load-more-btn text-center pt-50">
                        <button
                          onClick={handleLoadMore}
                          className="tp-btn tp-btn-2 tp-btn-blue"
                        >
                          {t("Load More")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  }

  return (
    <Wrapper>
      <SEO PageTitle="Search Products" />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <CommonBreadcrumb
          title={t("Search Products")}
          subtitle={t("Search Products")}
        />
        {content}
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
}
export const getServerSideProps = async (context) => {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: CATEGORIES_LIST,
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const searchQuery = context.query;
    if (response) {
      return {
        props: {
          category,
          footerLinks,
          messages,
          searchQuery,
        },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
};
