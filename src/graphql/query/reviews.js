import { gql } from "@apollo/client";



export const GET_PRODUCTS_REVIEW = gql`
query Reviews($filters: ReviewFiltersInput, $pagination: PaginationArg, $sort: [String]) {
    reviews(filters: $filters, pagination: $pagination, sort: $sort) {
      data {
        id
        attributes {
          ratings
          text
          publishedAt
          # users_permissions_user {
          #   data {
          #     id
          #     attributes {
          #       company_profile {
          #         data {
          #           attributes {
          #             companyName
          #           }
          #         }
          #       }
          #       user_profile {
          #         data {
          #           attributes {
          #             first_name
          #             last_name
          #           }
          #         }
          #       }
          #     }
          #   }
          # }
          product {
            data {
              attributes {
                slug
                title
              }
              id
            }
          }
        }
      }
    }
  }
  `;