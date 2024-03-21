import React from "react";
import Image from "next/image";
import Link from "next/link";
import SEO from "@/components/seo";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import error from "@assets/img/error/error.png";
import Header from "@/layout/headers/header";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { useTranslations } from "next-intl";

const ErrorPage = ({ category, footerLinks }) => {
  const t = useTranslations("header");
  return (
    <Wrapper>
      <SEO PageTitle="404" />
      <Header categories={category} />
      <div className="about-us-bg-image">
        <section className="tp-error-area pt-110 pb-110">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div className="tp-error-content text-center">
                  <div className="tp-error-thumb">
                    <Image src={error} alt="error img" />
                  </div>

                  <h3 className="tp-error-title">{t("Oops Page not found")}</h3>
                  <p>
                    {t(
                      "Whoops this is embarrassing Looks like the page you were looking for was not found"
                    )}
                  </p>

                  <Link href="/" className="tp-error-btn">
                    {t("Back to Home")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default ErrorPage;
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
