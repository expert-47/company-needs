/** @format */

import { gql } from "@apollo/client";

export const GET_ORDER_DETAIL = gql`
  query Order($orderId: ID) {
    order(id: $orderId) {
      data {
        attributes {
          Name
          status
          total
          publishedAt
          products {
            description
            description_ar
            price
            title_ar
            title
            productId
            imageUrl
            quantity
            discount
          }
          city
          country
          phoneNumber
          discount
          createdAt
          zipCode
          address
          email
        }
        id
      }
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query Orders($filters: OrderFiltersInput, $pagination: PaginationArg) {
    orders(filters: $filters, pagination: $pagination) {
      data {
        attributes {
          products {
            id
            sku
            title
            title_ar
            description
            description_ar
            price
            quantity
            productId
          }
          publishedAt
          total
          status
        }
        id
      }
      meta {
        pagination {
          page
          pageCount
          pageSize
          total
        }
      }
    }
  }
`;

export const ORDER_PAGE_SEO = gql`
  query {
    myOrdersPage {
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
