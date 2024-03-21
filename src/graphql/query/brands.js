/** @format */

import { gql } from "@apollo/client";

export const ALL_BRANDS_DATA = gql`
  query ($pagination: PaginationArg, $sort: [String]) {
    brands(pagination: $pagination, sort: $sort) {
      data {
        id
        attributes {
          name
          name_ar
          slug
          logo {
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
`;
