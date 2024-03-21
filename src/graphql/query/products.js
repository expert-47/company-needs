/** @format */

import { gql } from "@apollo/client";

export const PRODUCTS_DATA = gql`
  query (
    $pagination: PaginationArg
    $filters: ProductFiltersInput
    $sort: [String]
  ) {
    products(pagination: $pagination, filters: $filters, sort: $sort) {
      data {
        id
        attributes {
          slug
          sku
          title
          title_ar
          price
          description
          description_ar
          isTrending
          discount
          images {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
          publishedAt
          updatedAt
          brands {
            data {
              id
              attributes {
                name
                name_ar
              }
            }
          }
          category {
            data {
              id
              attributes {
                name
                name_ar
                slug
                brands {
                  data {
                    id
                    attributes {
                      name
                      name_ar
                    }
                  }
                }
                sub_categories {
                  data {
                    id
                    attributes {
                      slug
                      name
                      name_ar
                    }
                  }
                }
              }
            }
          }
          sub_category {
            data {
              id
              attributes {
                slug
                name
                name_ar
              }
            }
          }
        }
      }
      meta {
        pagination {
          pageCount
          pageSize
          total
          page
        }
      }
    }
  }
`;

export const PRODUCT_DETAIL_DATA = gql`
  query ($pagination: PaginationArg, $filters: ProductFiltersInput) {
    products(pagination: $pagination, filters: $filters) {
      data {
        id
        attributes {
          title
          title_ar
          slug
          sku
          price
          discount
          description_ar
          isTrending
          description
          condition
          condition_ar
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
          }
          category {
            data {
              id
              attributes {
                name
                name_ar
                slug
              }
            }
          }
          images {
            data {
              attributes {
                url
              }
            }
          }
          brands {
            data {
              attributes {
                name
                name_ar
              }
            }
          }
          sub_category {
            data {
              id
              attributes {
                name
                name_ar
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCTS_PAGE_SEO = gql`
  query {
    productPage {
      data {
        attributes {
          seo {
            metaTitle
            metaDescription
            keywords
            canonicalURL
            structuredData
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
