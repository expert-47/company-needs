/** @format */

import { gql } from "@apollo/client";

export const REVIEWS = gql`
  mutation Mutation($data: ReviewInput!) {
    createReview(data: $data) {
      data {
        id
        attributes {
          createdAt
          product {
            data {
              id
            }
          }
          publishedAt
          ratings
          text
          updatedAt
          users_permissions_user {
            data {
              id
              attributes {
                username
                reviews {
                  data {
                    id
                    attributes {
                      text
                      ratings
                    }
                  }
                }
                user_profile {
                  data {
                    id
                    attributes {
                      first_name
                      last_name
                      username
                      country
                      country_code
                    }
                  }
                }
                company_profile {
                  data {
                    id
                    attributes {
                      companyName
                      city
                      country
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
