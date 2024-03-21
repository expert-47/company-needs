import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import SEO from "@/components/seo";
import { NPS_SERVICES } from "@/data/data";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import React from "react";

const NpsServices = (props) => {
  const { footerLinks, category } = props;
  return (
    <Wrapper>
      <SEO PageTitle="NPS Services" />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <CommonBreadcrumb title="NPS Services" subtitle="NPS Services" />
        <div className="container mt-20" style={{ direction: "ltr" }}>
          {NPS_SERVICES.map((item) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div>
                <h5>{item.heading}</h5>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default NpsServices;
export async function getServerSideProps(context) {
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
        props: { category, footerLinks, messages },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
