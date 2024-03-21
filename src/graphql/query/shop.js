/** @format */

import { gql } from "@apollo/client";

export const CATEGORIES_LIST = gql`
  query (
    $pagination: PaginationArg
    $filters: CategoryFiltersInput
    $sort: [String]
  ) {
    categories(pagination: $pagination, filters: $filters, sort: $sort) {
      data {
        id
        attributes {
          name
          name_ar
          slug
          logo {
            data {
              id
              attributes {
                url
              }
            }
          }
          sub_categories {
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
      }
    }
  }
`;

export const SUB_CATEGORIES_LIST = gql`
  query SubCategories(
    $pagination: PaginationArg
    $filters: SubCategoryFiltersInput
  ) {
    subCategories(pagination: $pagination, filters: $filters) {
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
