import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  type Actor {
    person: Person!
    movies_played_in: [Movie]!
  }
`;

export const resolvers = {
  Actor: {
    person: (actor) => {
      return actor.getPerson();
    },
    movies_played_in: (actor): Array<any> => {
      return actor.getMoviesPlayedIn();
    },
  },
};
