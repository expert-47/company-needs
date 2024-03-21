/** @format */

import { gql } from "@apollo/client";

export const CONTACT_US_DATA = gql`
  query {
    contactUs {
      data {
        attributes {
          email
          phoneNumber
          Address
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
