import { useQuery } from "@apollo/client";
import { PRODUCTS_DATA } from "@/graphql/query/products";

export const useProductsQuery = (variables) => {
  const { data, error, loading } = useQuery(PRODUCTS_DATA, {
    variables: {
      pagination: {
        limit: 1000,
      },
    },
  });
  return {
    products: data?.products?.data || [],
    error,
    loading,
  };
};
