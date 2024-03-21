import { gql } from "@apollo/client";

export const SCORES_DATA = gql`
  query {
    scores {
      data {
        attributes {
          number
          title
        }
      }
    }
  }
`;

export const CATEGORIES_LIST = gql`
  query ($pagination: PaginationArg, $sort: [String]) {
    categories(pagination: $pagination, sort: $sort) {
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
              }
            }
          }
        }
      }
    }
  }
`;

export const PRIVACY_POLICY = gql`
  query ($locale: I18NLocaleCode) {
    privacyPolicy(locale: $locale) {
      data {
        attributes {
          title
          description
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

export const TERMS_AND_CONDITION = gql`
  query ($locale: I18NLocaleCode) {
    termsAndCondition(locale: $locale) {
      data {
        attributes {
          title
          description
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
export const WISHLIST_PAGE_SEO = gql`
  query {
    wishlistPage {
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
