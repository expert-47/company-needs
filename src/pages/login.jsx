import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import LoginArea from "@/components/login-register/login-area";
import Header from "@/layout/headers/header";
import client from "@/graphql/apollo-client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";

const LoginPage = ({ category, footerLinks }) => {
  return (
    <Wrapper>
      <SEO PageTitle="Login" />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <LoginArea />
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default LoginPage;
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

    if (response) {
      return {
        props: {
          category,
          messages,
          footerLinks,
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
