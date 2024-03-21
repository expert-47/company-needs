/** @format */

import React, { useState } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import ErrorMsg from "@/components/common/error-msg";
import Footer from "@/layout/footers/footer";
import client from "@/graphql/apollo-client";
import Header from "@/layout/headers/header";
import { CATEGORIES_LIST, SUB_CATEGORIES_LIST } from "@/graphql/query/shop";
import { PRODUCTS_DATA, PRODUCTS_PAGE_SEO } from "@/graphql/query/products";
import { ALL_BRANDS_DATA } from "@/graphql/query/brands";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { useTranslations } from "next-intl";

const ShopPage = ({
  products,
  category,
  subCategories,
  footerLinks,
  brands,
  seo,
}) => {
  const [currPage, setCurrPage] = useState(1);
  const otherProps = {
    currPage,
    setCurrPage,
  };
  let content = null;
  if (!products || products.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    content = (
      <>
        <div className="pt-20">
          <ShopArea
            all_products={products || []}
            products={products || []}
            otherProps={otherProps}
            categories={category}
            subCategories={subCategories}
            all_brands={brands}
          />
        </div>
      </>
    );
  }

  return (
    <Wrapper>
      <SEO seoData={seo} />
      <Header
        categories={category}
        socialLinks={footerLinks}
        stopShowingAllCategoriesInHeader={true}
      />
      <div className="about-us-bg-image">
        <ShopBreadcrumb title={t("Products")} subtitle={t("Products")} />
        {content}
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export const getServerSideProps = async (context) => {
  let messages = (await import(`../../messages/${context.locale}.json`))
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
            limit: 1000,
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
    ];
    const response = await Promise.all(queries);
    const products = response[0]?.data?.products?.data;
    const category = response[1]?.data?.categories?.data;
    const subCategories = response[2]?.data?.subCategories?.data;
    const brands = response[3]?.data?.brands?.data;
    const footerLinks = response[4]?.data?.socialMedia?.data;
    const seo = response[5]?.data?.productPage?.data?.attributes?.seo;
    if (response) {
      return {
        props: {
          products,
          category,
          messages,
          subCategories,
          brands,
          footerLinks,
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

export default ShopPage;
