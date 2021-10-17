import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    year: String!
    cast: [Actor!]
  }
`;

export const resolvers = {
  Movie: {
    id: (movie): string => {
      return movie.getId();
    },
    name: (movie): string => {
      return movie.getName();
    },
    year: (movie): string => {
      return movie.getYear();
    },
    cast: (movie) => {
      return movie.getCast();
    },
  },
};
