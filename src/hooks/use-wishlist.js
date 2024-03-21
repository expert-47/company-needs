import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { gql, useMutation } from "@apollo/client";
import { on_update_product } from "@/redux/features/cartSlice";
import client from "@/graphql/apollo-client";
import { update_wishlist } from "@/redux/features/wishlist-slice";
import { notifyError, notifySuccess } from "@/utils/toast";

export const addFavouriteQuery = gql`
  mutation CreateFavourite($data: FavouriteInput!) {
    createFavourite(data: $data) {
      data {
        id
        attributes {
          product {
            data {
              id
              attributes {
                images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                title
                slug
                isTrending
                discount
                price
                description
              }
            }
          }
        }
      }
    }
  }
`;
export const deleteFavouriteQuery = gql`
  mutation DeleteFavourite($deleteFavouriteId: ID!) {
    deleteFavourite(id: $deleteFavouriteId) {
      data {
        id
        attributes {
          product {
            data {
              id
              attributes {
                images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                title
                slug
                isTrending
                discount
                price
                description
              }
            }
          }
        }
      }
    }
  }
`;
export const getFavouriteProductQuery = gql`
  query Favourites($filters: FavouriteFiltersInput) {
    favourites(filters: $filters) {
      data {
        id
        attributes {
          product {
            data {
              id
              attributes {
                images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                title
                slug
                isTrending
                discount
                price
                description
              }
            }
          }
        }
      }
    }
  }
`;
export const useWishList = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist) || [];
  const dispatch = useDispatch();
  const token = getCookie("token");
  const userCookie = getCookie("userInfo");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const getWishList = async () => {
    try {
      const response = await client.query({
        query: getFavouriteProductQuery,
        fetchPolicy: "network-only",
        variables: {
          filters: {
            user: {
              id: {
                eq: user.id,
              },
            },
          },
          pagination: {
            limit: 1000,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      dispatch(update_wishlist(response?.data?.favourites?.data));
    } catch (error) {}
  };
  const addProductToWishList = async (data) => {
    try {
      const response = await client.mutate({
        mutation: addFavouriteQuery,
        variables: { data: { ...data, user: user?.id } },
        fetchPolicy: "no-cache",
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (response.data) {
        notifySuccess(`Product added to wishlist`);
      }
      dispatch(
        update_wishlist([...wishlist, response.data.createFavourite.data])
      );
    } catch (error) {
      console.log("error", error);
      notifyError("Failed  to  add wishlist");
    }
  };
  const removeProductToWishList = async (data) => {
    try {
      const response = await client.mutate({
        mutation: deleteFavouriteQuery,
        variables: { ...data },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });
      if (response.data) {
        notifySuccess(`Product removed from wishlist`);
      }
      const items = wishlist.filter(
        (item) => item.id != data.deleteFavouriteId
      );
      dispatch(update_wishlist(items));
    } catch (error) {
      console.log("error", error);
      notifyError("failed to wishlist");
    }
  };
  return {
    addProductToWishList,
    removeProductToWishList,
    getWishList,
    wishlist,
  };
};
