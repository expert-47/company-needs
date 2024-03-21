import React from "react";
import SEO from "@/components/seo";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import ContactArea from "@/components/contact/contact-area";
import client from "@/graphql/apollo-client";
import { CONTACT_US_DATA } from "@/graphql/query/contact-us";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
const ContactPage = ({ contactDetail, category, footerLinks, seo } = props) => {
  return (
    <Wrapper>
      <SEO seoData={seo} />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <ContactArea {...contactDetail} />
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default ContactPage;

export async function getStaticProps(context) {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: CONTACT_US_DATA,
      }),
      client.query({
        query: CATEGORIES_LIST,
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);
    const contactDetail = response[0]?.data?.contactUs?.data;
    const category = response[1]?.data?.categories?.data;
    const footerLinks = response[2]?.data?.socialMedia?.data;
    const seo = response[0]?.data?.contactUs?.data?.attributes?.seo;
    if (response) {
      return {
        props: {
          contactDetail,
          messages,
          category,
          footerLinks,
          seo,
        },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
