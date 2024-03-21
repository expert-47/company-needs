import { gql } from "@apollo/client";

export const CONTACT_US = gql`
  mutation Mutation($data: ContactInput!) {
    createContact(data: $data) {
      data {
        id
      }
    }
  }
`;
