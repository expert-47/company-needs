import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation CreateCart($data: CartInput!) {
    createCart(data: $data) {
      data {
        id
        attributes {
          quantity
          product {
            data {
              id
              attributes {
                price
                images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                sku
                discount
                title
                description
                slug
              }
            }
          }
        }
      }
    }
  }
`;
export const DELETE_FROM_CART = gql`
  mutation DeleteCart($deleteCartId: ID!) {
    deleteCart(id: $deleteCartId) {
      data {
        id
        attributes {
          product {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;
export const UPDATE_CART_QUANTITY = gql`
  mutation UpdateCart($updateCartId: ID!, $data: CartInput!) {
    updateCart(id: $updateCartId, data: $data) {
      data {
        id
        attributes {
          quantity
          product {
            data {
              attributes {
                title
                title_ar
              }
            }
          }
        }
      }
    }
  }
`;
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
                condition
                condition_ar
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
export const CREATE_ORDER = gql`
  mutation CreateOrder($data: OrderInput!) {
    createOrder(data: $data) {
      data {
        id
        attributes {
          status
          products {
            id
          }
        }
      }
    }
  }
`;
