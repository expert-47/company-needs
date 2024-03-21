import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import React from "react";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import SEO from "@/components/seo";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import NewArrivals from "@/components/products/new-arrivals";
import { PRODUCTS_DATA } from "@/graphql/query/products";
import ProductArea from "@/components/products/product-area";
import Accessories from "@/components/products/accessories";
import { useTranslations } from "next-intl";
const NewProducts = (props) => {
  const { footerLinks, category, newarrival, trending, accessories } = props;
  const t = useTranslations("header");
  return (
    <Wrapper>
      <SEO PageTitle="New Products" />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <CommonBreadcrumb
          title={t("New Products")}
          subtitle={t("New Products")}
        />
        <div className="pt-50">
          <NewArrivals products={newarrival} />
          <ProductArea products={trending} />
          <Accessories products={accessories} />
        </div>
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default NewProducts;
export async function getServerSideProps(context) {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  let token = context?.req?.cookies?.token;
  try {
    const queries = [
      client.query({
        query: CATEGORIES_LIST,
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 10,
          },
        },
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 12,
          },
          filters: {
            isTrending: {
              eq: true,
            },
          },
        },
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 10,
          },
        },
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const newarrival = response[2]?.data?.products?.data;
    const trending = response[3]?.data?.products?.data;
    const accessories = response[4]?.data?.products?.data;
    if (response) {
      return {
        props: {
          category,
          footerLinks,
          messages,
          newarrival,
          trending,
          accessories,
        },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
