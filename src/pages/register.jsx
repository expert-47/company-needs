import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import RegisterArea from "@/components/login-register/register-area";
import Header from "@/layout/headers/header";
import client from "@/graphql/apollo-client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";

const RegisterPage = ({ category, footerLinks }) => {
  return (
    <Wrapper>
      <SEO PageTitle="Register" />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <RegisterArea />
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default RegisterPage;
export async function getStaticProps(context) {
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
    if (response) {
      return {
        props: {
          category,
          messages,
          footerLinks,
        },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
