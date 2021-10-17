import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Actor implements Person {
    id: ID!
    name: String!
    age: Int!
    gender: Gender
    movies_played_in: [Movie]!
  }
`;

export const resolvers = {
  Actor: {
    id: (actor): string => {
      return actor.getId();
    },
    name: (actor): string => {
      return actor.getName();
    },
    age: (actor): number => {
      return actor.getAge();
    },
    gender: (actor): string => {
      return actor.getGender();
    },
    movies_played_in: (actor): Array<any> => {
      return actor.getMoviesPlayedIn();
    },
  },
};
