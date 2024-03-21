import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import SEO from "@/components/seo";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { TERMS_AND_CONDITION } from "@/graphql/query/home";
import { CATEGORIES_LIST } from "@/graphql/query/shop";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const TermsAndCondition = ({
  category,
  footerLinks,
  termsAndCondition,
  seo,
}) => {
  return (
    <Wrapper>
      <SEO seoData={seo} />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <CommonBreadcrumb
          title={termsAndCondition?.attributes?.title}
          subtitle={termsAndCondition?.attributes?.title}
        />
        <section className="tp-error-area pt-50" style={{ direction: "ltr" }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <ReactMarkdown
                  children={termsAndCondition?.attributes?.description}
                  remarkPlugins={[remarkGfm]}
                  className="markdown"
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        style={{ fontSize: "32px", color: "black" }}
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        style={{ fontSize: "20px", color: "black" }}
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        style={{ fontSize: "24px", color: "black" }}
                        {...props}
                      />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4
                        style={{ fontSize: "20px", color: "black" }}
                        {...props}
                      />
                    ),
                    h5: ({ node, ...props }) => (
                      <h5
                        style={{ fontSize: "18px", color: "black" }}
                        {...props}
                      />
                    ),
                    h6: ({ node, ...props }) => (
                      <h6
                        style={{ fontSize: "18px", color: "black" }}
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        style={{ fontSize: "16px", color: "black" }}
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <p
                        style={{ fontSize: "16px", color: "black" }}
                        fontWeight={"400"}
                        {...props}
                      />
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default TermsAndCondition;
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
        query: TERMS_AND_CONDITION,
        variables: {
          locale: context?.locale || "en",
        },
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const termsAndCondition = response[2]?.data?.termsAndCondition?.data;
    const seo = response[2]?.data?.termsAndCondition?.data?.attributes?.seo;

    if (response) {
      return {
        props: {
          category,
          messages,
          footerLinks,
          termsAndCondition,
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
