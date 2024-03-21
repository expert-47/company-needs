import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Footer from "@/layout/footers/footer";
import ProfileArea from "@/components/my-account/profile-area";
import Loader from "@/components/loader/loader";
import Header from "@/layout/headers/header";
import client from "@/graphql/apollo-client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import { GET_COMPANY_PROFILE, GET_USER_PROFILE } from "@/graphql/query/profile";
import { SOCIAL_LINKS } from "@/graphql/query/footer";

const ProfilePage = ({
  category,
  type,
  data,
  isError,
  isLoading,
  footerLinks,
}) => {
  if (isLoading && isError) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader loading={isLoading} />
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO PageTitle="Profile" />
      <Header categories={category} socialLinks={footerLinks} />
      <div className="about-us-bg-image">
        <ProfileArea type={type} data={data} orderData={"orderData"} />
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default ProfilePage;
export const getServerSideProps = async (context) => {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  let token = context?.req?.cookies?.token;
  let userInfo = JSON.parse(context?.req?.cookies?.userInfo);
  try {
    if (!token && response) {
      return {
        redirect: {
          destination: "/login",
          permanent: true,
        },
      };
    } else {
      const queries = [
        client.query({
          query: CATEGORIES_LIST,
        }),
        client.query({
          query:
            userInfo.formType == "user"
              ? GET_USER_PROFILE
              : GET_COMPANY_PROFILE,
          variables: {
            filters: {
              user: {
                id: {
                  eq: userInfo.id,
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
        client.query({
          query: SOCIAL_LINKS,
        }),
      ];
      const response = await Promise.all(queries);
      const category = response[0]?.data?.categories?.data;
      const userData = response[1].data;
      const footerLinks = response[2]?.data?.socialMedia?.data;
      return {
        props: {
          category,
          messages,
          footerLinks,
          type: userInfo?.formType,
          data:
            userData?.userProfiles?.data[0] ||
            userData?.companyProfiles?.data[0],
        },
      };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
};
