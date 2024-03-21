/** @format */

import { gql } from "@apollo/client";

export const SOCIAL_LINKS = gql`
  query {
    socialMedia {
      data {
        attributes {
          facebookUrl
          instagramUrl
          linkedInUrl
          pinterestUrl
          twitterUrl
          whatsappNumber
          youtubeUrl
          seo {
            metaTitle
            metaDescription
            keywords
            structuredData
            canonicalURL
            metaRobots
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
