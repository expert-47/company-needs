import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import MyOrders from "@/components/my-account/my-orders";
import SEO from "@/components/seo";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { ORDER_PAGE_SEO } from "@/graphql/query/orderdetails";
import { CATEGORIES_LIST } from "@/graphql/query/shop";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { useTranslations } from "next-intl";
import React from "react";

const Orders = ({ category, footerLinks, seo }) => {
  const t = useTranslations("header");
  return (
    <Wrapper>
      <SEO seoData={seo} />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <CommonBreadcrumb title={t("My Orders")} subtitle={t("My Orders")} />
        <div className="pt-50 pb-80">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <MyOrders />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default Orders;
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
      client.query({
        query: ORDER_PAGE_SEO,
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const seo = response[2]?.data?.myOrdersPage?.data?.attributes?.seo;

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
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
