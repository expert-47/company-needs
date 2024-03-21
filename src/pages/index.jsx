import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import ProductArea from "@/components/products/product-area";
import NewArrivals from "@/components/products/new-arrivals";
import Footer from "@/layout/footers/footer";
import AboutPage from "@/components/about-us/about";
import Accessories from "@/components/products/accessories";
import Scores from "@/components/scores/scores";
import Testimonials from "@/components/testimonials/testimonials";
import client from "@/graphql/apollo-client";
import { ABOUT_US_DATA } from "@/graphql/query/about";
import { PRODUCTS_DATA } from "@/graphql/query/products";
import { CATEGORIES_LIST, SCORES_DATA } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { GET_PRODUCTS_REVIEW } from "@/graphql/query/reviews";
import LandingPageHeader from "@/layout/headers/landingHeader";
import HomeBannerVideo from "@/components/hero-banner/home-banner-video";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import OurSuccess from "@/components/our-success/our-success";
import OurServices from "@/components/our-services/our-services";
import HelpBusiness from "@/components/help-business/help-business";
import GetInTouch from "@/components/get-in-touch/get-in-touch";

export default function Home(props) {
  const {
    about,
    newarrival,
    trending,
    accessories,
    scores,
    footerLinks,
    productReviews,
    seo,
  } = props;
  const t = useTranslations("header");
  const route = useRouter();
  return (
    <Wrapper>
      <SEO seoData={seo} />
      <LandingPageHeader socialLinks={footerLinks} />
      {/*<HomeHeroSlider /> */}
      <HomeBannerVideo />
      <AboutPage
        title={about?.attributes?.title}
        description={about?.attributes.description}
        onClick={() => {
          route.push("/about");
        }}
        image={about?.attributes?.image?.data?.attributes?.url}
        heading={t("Get To Know Us Better")}
      />
      {/* <Scores scores={scores} /> */}
      <OurSuccess />
      <OurServices />
      <HelpBusiness />
      <GetInTouch />

      {/* <AboutPage
        title={"Our Services"}
        description={about?.attributes.description}
        onClick={() => {
          route.push("/ourshop");
        }}
        image={about?.attributes?.image?.data?.attributes?.url}
      /> */}
      {/* <AboutPage
        title={"Our Network Pro Services"}
        description={about?.attributes.description}
        onClick={() => {
          window.open(
            "https://www.africau.edu/images/default/sample.pdf",
            "_blank"
          );
        }}
        image={about?.attributes?.image?.data?.attributes?.url}
      /> */}

      {/* <Testimonials productReviews={productReviews} />
      <NewArrivals products={newarrival} />
      <ProductArea products={trending} />
      <Accessories products={accessories} /> */}
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  let token = context?.req?.cookies?.token;
  try {
    const queries = [
      client.query({
        query: ABOUT_US_DATA,
        variables: {
          locale: context?.locale || "en",
        },
      }),
      client.query({
        query: SCORES_DATA,
      }),
      client.query({
        query: CATEGORIES_LIST,
        variables: {
          pagination: {
            limit: 100,
          },
        },
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 10,
          },
        },
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 12,
          },
          filters: {
            isTrending: {
              eq: true,
            },
          },
        },
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 10,
          },
        },
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);

    const about = response[0]?.data?.aboutUs?.data;
    const scores = response[1]?.data?.scores?.data;
    const category = response[2]?.data?.categories?.data;
    const newarrival = response[3]?.data?.products?.data;
    const trending = response[4]?.data?.products?.data;
    const accessories = response[5]?.data?.products?.data;
    const footerLinks = response[6]?.data?.socialMedia?.data;
    const productReviews = [];
    const seo = response[6]?.data?.socialMedia?.data?.attributes?.seo;
    if (response) {
      return {
        props: {
          about,
          scores,
          category,
          newarrival,
          trending,
          accessories,
          messages,
          footerLinks,
          productReviews,
          seo,
        },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    console.log("error", error);
    return { props: { error: true, messages } };
  }
}
