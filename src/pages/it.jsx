import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import SEO from "@/components/seo";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { useTranslations } from "next-intl";
import React from "react";

const IT = (props) => {
  const { footerLinks, category } = props;
  const t = useTranslations("header");

  return (
    <Wrapper>
      <SEO PageTitle="IT Services" />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <CommonBreadcrumb
          title={t("IT Services")}
          subtitle={t("IT Services")}
        />
        <div className="pt-100 pb-100 d-flex justify-content-center">
          <h1>{t("Coming Soon")}</h1>
        </div>
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default IT;
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
