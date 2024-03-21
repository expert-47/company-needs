import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import CartArea from "@/components/cart-wishlist/cart-area";
import Header from "@/layout/headers/header";
import client from "@/graphql/apollo-client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import { CART_PAGE_SEO } from "@/graphql/query/cart";
import { useTranslations } from "next-intl";

const CartPage = ({ category, footerLinks, seo }) => {
  const t = useTranslations("header");
  return (
    <Wrapper>
      <SEO seoData={seo} />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <CommonBreadcrumb title={t("Cart")} subtitle={t("Cart")} />
        <CartArea />
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default CartPage;
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
      client.query({
        query: CART_PAGE_SEO,
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const seo = response[2]?.data?.cartPage?.data?.attributes?.seo;
    if (response) {
      return {
        props: {
          category,
          messages,
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
