import { gql } from 'apollo-server-core';
import { DGraphLoader } from 'src/data-loaders/dGraph/dGraphLoader';
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
      return new DGraphLoader().getActors();
    },
    movie: (query) => {
      return query.getMovies();
    },
    people: (query) => {
      return query.getPeople();
    },
  },
};
