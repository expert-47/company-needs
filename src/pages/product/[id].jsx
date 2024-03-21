import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import ErrorMsg from "@/components/common/error-msg";
import ProductDetailsBreadcrumb from "@/components/breadcrumb/product-details-breadcrumb";
import ProductDetailsArea from "@/components/product-details/product-details-area";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import Header from "@/layout/headers/header";
import { PRODUCTS_DATA, PRODUCT_DETAIL_DATA } from "@/graphql/query/products";
import client from "@/graphql/apollo-client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import RelatedProducts from "@/components/product-details/related-products";
import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { GET_PRODUCTS_REVIEW } from "@/graphql/query/reviews";
import { getCookie } from "cookies-next";
import { getVariableValues } from "graphql";
import { useRouter } from "next/router";
import { getLanguageBasedValue } from "@/lib/get-language";

const ProductDetailsPage = (props) => {
  const t = useTranslations("header");
  const router = useRouter();
  const {
    product,
    products,
    isLoading,
    isError,
    category,
    footerLinks,
    productReviews,
    seo,
  } = props;
  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <div>
        <ProductDetailsBreadcrumb
          category={getLanguageBasedValue(
            product[0]?.attributes?.category?.data?.attributes,
            "name",
            "",
            router.locale
          )}
          title={getLanguageBasedValue(
            product[0]?.attributes,
            "title",
            "",
            router.locale
          )}
        />
        <ProductDetailsArea
          productItem={product}
          productReviews={productReviews}
        />
        {products?.length > 0 ? (
          <section className="tp-related-product pt-95 pb-50">
            <div className="container">
              <div className="row">
                <div className="tp-section-title-wrapper-6 text-center mb-40">
                  <span className="tp-section-title-pre-6">
                    {t("Next day Products")}
                  </span>
                  <h3 className="tp-section-title-6">
                    {t("Related Products")}
                  </h3>
                </div>
              </div>
              <div className="row">
                <RelatedProducts
                  product={products}
                  productReviews={productReviews}
                />
              </div>
            </div>
          </section>
        ) : null}
      </div>
    );
  }
  return (
    <Wrapper>
      <SEO seoData={seo} />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">{content}</div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default ProductDetailsPage;
export const getServerSideProps = async (context) => {
  let messages = (await import(`../../../messages/${context.locale}.json`))
    .default;
  let token = context?.req?.cookies?.token;
  try {
    const queries = [
      client.query({
        query: PRODUCT_DETAIL_DATA,
        variables: {
          filters: {
            slug: {
              eq: context?.query?.id,
            },
          },
        },
      }),
      client.query({
        query: CATEGORIES_LIST,
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          filters: {
            category: {
              name: {
                eq: "Computer Printer Accessories",
              },
            },
          },
        },
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
      client.query({
        query: GET_PRODUCTS_REVIEW,
        variables: {
          filters: {
            product: {
              slug: {
                eq: context?.query?.id,
              },
            },
          },
          pagination: {
            limit: 3,
          },
          sort: "publishedAt:desc",
        },
        // context: {
        //   headers: {
        //     authorization: `Bearer ${token}`,
        //   },
        // },
      }),
    ];
    const response = await Promise.all(queries);
    const product = response[0]?.data?.products?.data || [];
    let relatedProducts = [];
    if (product[0]?.attributes?.sub_category?.data?.id) {
      relatedProducts = await Promise.resolve(
        client.query({
          query: PRODUCTS_DATA,
          variables: {
            filters: {
              sub_category: {
                id: {
                  eq: product[0]?.attributes?.sub_category?.data?.id,
                },
              },
            },
          },
        })
      );
    }
    const filteredRelatedProducts =
      relatedProducts?.data?.products?.data.filter(
        (item) => item?.id !== product[0]?.id
      );
    const category = response[1]?.data?.categories?.data;
    const products = response[2]?.data?.products?.data;
    const footerLinks = response[3]?.data?.socialMedia?.data;
    const productReviews = response[4]?.data?.reviews?.data || [];
    const seo = response[0]?.data?.products?.data[0]?.attributes?.seo || [];
    if (response) {
      return {
        props: {
          product,
          category,
          products: filteredRelatedProducts,
          messages,
          footerLinks,
          productReviews,
          seo,
        },
      };
    } else {
      console.log("error");
      return { props: { error: true, messages } };
    }
  } catch (error) {
    console.log("error", error);
    return { props: { error: true, messages } };
  }
};
