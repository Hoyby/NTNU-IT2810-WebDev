import { gql } from 'apollo-server-core';
import { IResolvers } from '../types/resolvers';

export const typeDefs = gql`
  type Query {
    actors: [Actor!]
    movie: [Movie!]
    people: [Person!]
  }
`;

export const resolvers: IResolvers<any> = {
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
