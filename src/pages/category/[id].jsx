/** @format */

import React, { useState } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import NoProductFound from "@/components/common/no-products-found";
import Footer from "@/layout/footers/footer";
import client from "@/graphql/apollo-client";
import Header from "@/layout/headers/header";
import { CATEGORIES_LIST, SUB_CATEGORIES_LIST } from "@/graphql/query/shop";
import { PRODUCTS_DATA, PRODUCTS_PAGE_SEO } from "@/graphql/query/products";
import { ALL_BRANDS_DATA } from "@/graphql/query/brands";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { getLanguageBasedValue } from "@/lib/get-language";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

const CategoryProductsPage = ({
  productss,
  category,
  subCategories,
  footerLinks,
  brands,
  seo,
  categoryDetails,
  categBasedSubCategories,
}) => {
  const router = useRouter();
  const t = useTranslations("header");
  const [currPage, setCurrPage] = useState(1);
  let product_items = productss;
  const otherProps = {
    currPage,
    setCurrPage,
  };
  let content = null;
  if (!productss || productss.length === 0) {
    content = <NoProductFound message="No Products found" />;
  } else {
    product_items = productss;
    content = (
      <>
        <ShopArea
          all_products={productss}
          products={product_items}
          otherProps={otherProps}
          //   categories={category}
          subCategories={subCategories}
          all_brands={brands}
          accordian={true}
          subCategoriesData={categBasedSubCategories || []}
        />
      </>
    );
  }
  return (
    <Wrapper>
      <SEO seoData={seo} />
      <Header
        categories={category}
        socialLinks={footerLinks}
        stopShowingAllCategoriesInHeader
      />
      <div className="about-us-bg-image">
        <ShopBreadcrumb
          title={
            getLanguageBasedValue(
              categoryDetails?.attributes,
              "name",
              "",
              router.locale
            ) || t("Our Shop")
          }
          firstSubtitle={t("Categories")}
          subtitle={
            getLanguageBasedValue(
              categoryDetails?.attributes,
              "name",
              "",
              router.locale
            ) || t("Products")
          }
        />
        {content}
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export const getServerSideProps = async (context) => {
  let messages = (await import(`../../../messages/${context.locale}.json`))
    .default;

  try {
    const queries = [
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 12,
          },
          sort: "updatedAt:desc",
          filters: {
            category: {
              slug: {
                eq: context?.params?.id || null,
              },
            },
          },
        },
      }),
      client.query({
        query: CATEGORIES_LIST,
        variables: {
          pagination: {
            page: 1,
            pageSize: 12,
          },
        },
      }),
      client.query({
        query: SUB_CATEGORIES_LIST,
        variables: {
          pagination: {
            page: 1,
            pageSize: 12,
          },
        },
      }),
      client.query({
        query: ALL_BRANDS_DATA,
        variables: {
          pagination: {
            page: 1,
            pageSize: 12,
          },
          title: context.query.id,
        },
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
      client.query({
        query: PRODUCTS_PAGE_SEO,
      }),
      client.query({
        query: CATEGORIES_LIST,
        variables: {
          pagination: {
            page: 1,
            pageSize: 12,
          },
          sort: "updatedAt:desc",

          filters: {
            slug: {
              eq: context?.params?.id || null,
            },
          },
        },
      }),
      client.query({
        query: SUB_CATEGORIES_LIST,
        variables: {
          pagination: {
            page: 1,
            pageSize: 12,
          },
          filters: {
            category: {
              slug: {
                eq: context?.params?.id || null,
              },
            },
          },
        },
      }),
    ];
    const response = await Promise.all(queries);
    const productss = response[0]?.data?.products?.data;
    const category = response[1]?.data?.categories?.data;
    const subCategories = response[2]?.data?.subCategories?.data;
    const brands = response[3]?.data?.brands?.data;
    const footerLinks = response[4]?.data?.socialMedia?.data;
    const seo = response[5]?.data?.productPage?.data?.attributes?.seo;
    const categoryDetails = response[6]?.data?.categories?.data
      ? response[6]?.data?.categories?.data[0]
      : {};
    const categBasedSubCategories = response[7]?.data?.subCategories?.data;

    if (response) {
      return {
        props: {
          productss,
          category,
          messages,
          subCategories,
          brands,
          footerLinks,
          seo,
          categoryDetails,
          categBasedSubCategories,
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

export default CategoryProductsPage;
