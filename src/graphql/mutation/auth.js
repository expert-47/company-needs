import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation ($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      status
      company_profile {
        id
        companyName
        profile_image {
          url
        }
      }
      user_profile {
        id
        first_name
        last_name
        profile_image {
          url
        }
      }
      user {
        id
        type
        username
        email
        confirmed
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      status
      company_profile {
        id
        companyName
        profile_image {
          url
        }
      }
      user_profile {
        id
        first_name
        last_name
        profile_image {
          url
        }
      }
      user {
        blocked
        confirmed
        email
        id
        username
      }
    }
  }
`;

export const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($input: GoogleloginInput!) {
    googleLogin(input: $input) {
      jwt
      email
      message
      status
      user {
        company_profile {
          companyName
          id
          profile_image {
            url
          }
        }
        email
        id
        type
        user_profile {
          first_name
          id
          last_name
          profile_image {
            url
          }
        }
        username
      }
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $updateUserProfileId: ID!
    $data: UserProfileInput!
  ) {
    updateUserProfile(id: $updateUserProfileId, data: $data) {
      data {
        id
        attributes {
          first_name
          last_name
          phoneNumber
          username
          calling_code
          country_code
          shipping_address
          street
          city
          country
          zip_code
          lat
          long
          profile_image {
            data {
              id
              attributes {
                url
              }
            }
          }
          user {
            data {
              attributes {
                confirmed
                email
                isDeleted
                type
                blocked
              }
            }
          }
        }
      }
    }
  }
`;
export const UPDATE_COMPANY_PROFILE = gql`
  mutation UpdateCompanyProfile(
    $updateCompanyProfileId: ID!
    $data: CompanyProfileInput!
  ) {
    updateCompanyProfile(id: $updateCompanyProfileId, data: $data) {
      data {
        id
        attributes {
          CRNumber
          companyName
          phoneNumber
          taxNumber
          calling_code
          country_code
          shipping_address
          street
          city
          country
          zip_code
          lat
          long
          profile_image {
            data {
              id
              attributes {
                url
              }
            }
          }
          user {
            data {
              attributes {
                confirmed
                blocked
                email
                isDeleted
                type
                username
              }
            }
          }
        }
      }
    }
  }
`;
export const UPLOAD_PROFILE_IMAGE = gql`
  mutation ($file: Upload!) {
    upload(file: $file) {
      data {
        id
        attributes {
          url
        }
      }
    }
  }
`;
export const VERIFY_OTP = gql`
  mutation VerifyOtp($input: VerifyOtpInput!) {
    verifyOtp(input: $input) {
      status
      message
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
      status
    }
  }
`;

export const CREATE_NEW_PASSWORD = gql`
  mutation NewPassword($input: NewPasswordInput!) {
    newPassword(input: $input) {
      message
      status
    }
  }
`;

export const CHANGED_PASSWORD = gql`
  mutation ChangePassword(
    $currentPassword: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    changePassword(
      currentPassword: $currentPassword
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      status
      user {
        id
      }
    }
  }
`;

export const RESEND_OTP = gql`
  mutation ResendOtp($input: ResendOtpInput!) {
    resendOtp(input: $input) {
      message
      status
    }
  }
`;
