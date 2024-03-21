import { gql } from "@apollo/client";

export const USER_DATA = gql`
  query {
    userProfiles {
      data {
        attributes {
          username
          phoneNumber
          street
          shipping_address
          city
          country
          country_code
        }
      }
    }
  }
`;
