import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query($filters: UserProfileFiltersInput) {
    userProfiles(filters: $filters) {
      data {
        attributes {
          username
          first_name
          last_name
          profile_image {
            data {
              attributes {
                url
              }
            }
          }
          shipping_address
          street
          city
          country
          country_code
          calling_code
          phoneNumber
          zip_code
        }
      }
    }
  }
`;

export const GET_COMPANY_PROFILE = gql`
  query($filters: CompanyProfileFiltersInput) {
    companyProfiles(filters: $filters) {
      data {
        attributes {
          companyName
          country_code
          phoneNumber
          calling_code
          profile_image {
            data {
              attributes {
                url
              }
            }
          }
          CRNumber
          taxNumber
          shipping_address
          street
          city
          country
          zip_code
          lat
          long
        }
      }
    }
  }
`;

