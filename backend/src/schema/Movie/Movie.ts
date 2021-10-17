import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    year: Date!
    cast: [Actor!]
  }
`;

export const resolvers = {
  Movie: {},
};
