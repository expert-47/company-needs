import { gql } from "@apollo/client";

export const GET_ALL_CART_PRODUCT = gql`
  query Carts($filters: CartFiltersInput) {
    carts(filters: $filters) {
      data {
        id
        attributes {
          product {
            data {
              id
              attributes {
                title
                title_ar
                discount
                isTrending
                description
                description_ar
                condition_ar
                condition
                price
                sku
                images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                slug
              }
            }
          }
          quantity
        }
      }
    }
  }
`;

export const CART_PAGE_SEO = gql`
  query {
    cartPage {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
            keywords
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
            structuredData
          }
        }
      }
    }
  }
`;
