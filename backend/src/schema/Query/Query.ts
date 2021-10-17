import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Query {
    actors: [Actor!]
    movie: [Movie!]
    people: [Person!]
  }
`;

export const resolvers = {
  Query: {
    actors: (query) => {
      query.getActors();
    },
    movie: (query) => {
      query.getMovies();
    },
    people: (query) => {
      query.getPeople();
    },
  },
};
