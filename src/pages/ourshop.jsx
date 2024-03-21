import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import React from "react";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import OurShopPage from "@/components/ourShop";
import Header from "@/layout/headers/header";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import { useTranslations } from "next-intl";

const OurShop = (props) => {
  const { footerLinks, category } = props;
  const t = useTranslations("header");
  return (
    <Wrapper>
      <SEO PageTitle="Our Shop" />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <CommonBreadcrumb title={t("Categories")} subtitle={t("Categories")} />
        <OurShopPage categories={category} />
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default OurShop;
export async function getServerSideProps(context) {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  let token = context?.req?.cookies?.token;
  try {
    const queries = [
      client.query({
        query: CATEGORIES_LIST,
        variables: {
          pagination: {
            page: 1,
            pageSize: 14,
          },
          sort: "updatedAt:desc",
        },
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    if (response) {
      return {
        props: { category, footerLinks, messages },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
