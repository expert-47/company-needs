import { gql } from "@apollo/client";

export const ABOUT_US_DATA = gql`
  query AboutUs($locale: I18NLocaleCode) {
    aboutUs(locale: $locale) {
      data {
        attributes {
          title
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
          seo {
            metaTitle
            metaDescription
            keywords
            canonicalURL
            metaRobots
            structuredData
            metaViewport
            metaSocial {
              title
              description
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            metaImage {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;
