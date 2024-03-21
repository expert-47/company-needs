import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
const baseUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://cn.liveurdunews.com";
const client = new ApolloClient({
  uri: `${baseUrl}/graphql`,
  cache: new InMemoryCache(),
});
export default client;
const uploadLink = createUploadLink({
  uri: `${baseUrl}/graphql`,
});
export const uploadFileClient = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});
export const apiConfig = {
  baseUrlMedia: `${baseUrl}`,
  baseUrl: `${baseUrl}/graphql`,
  UPLOAD_FILE: "/api/upload",
};
