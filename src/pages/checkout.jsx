import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import CheckoutArea from "@/components/checkout/checkout-area";
import Header from "@/layout/headers/header";
import client from "@/graphql/apollo-client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { GET_COMPANY_PROFILE, GET_USER_PROFILE } from "@/graphql/query/profile";
import { useTranslations } from "next-intl";

const CheckoutPage = ({ category, footerLinks, data }) => {
  const router = useRouter();
  const t = useTranslations("header");

  useEffect(() => {
    const isAuthenticate = Cookies.get("userInfo");
    if (!isAuthenticate) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Wrapper>
      <SEO seoData="Checkout" />
      <Header categories={category} socialLinks={footerLinks} />
      <CommonBreadcrumb
        title={t("Checkout")}
        subtitle={t("Checkout")}
        bg_clr={true}
      />
      <CheckoutArea userData={data} />
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default CheckoutPage;
export const getServerSideProps = async (context) => {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  let token = context?.req?.cookies?.token;
  let userInfo = JSON.parse(context?.req?.cookies?.userInfo);
  try {
    const queries = [
      client.query({
        query: CATEGORIES_LIST,
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
      client.query({
        query:
          userInfo.formType == "user" ? GET_USER_PROFILE : GET_COMPANY_PROFILE,
        variables: {
          filters: {
            user: {
              id: {
                eq: userInfo?.id,
              },
            },
          },
        },
        fetchPolicy: "no-cache",
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const userData = response[2]?.data;
    if (response) {
      return {
        props: {
          category,
          messages,
          footerLinks,
          data:
            userData?.userProfiles?.data[0] ||
            userData?.companyProfiles?.data[0],
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
