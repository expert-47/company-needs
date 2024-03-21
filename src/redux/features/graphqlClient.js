/** @format */

import { GraphQLClient } from "graphql-request";

const graphqlEndpoint = "https://07eb-39-55-227-153.ngrok-free.app/graphql"; // Replace with your GraphQL endpoint
export const graphqlClient = new GraphQLClient(graphqlEndpoint);
