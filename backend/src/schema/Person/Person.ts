import { gql } from 'apollo-server-core';

export const typeDefs = gql`
  enum Gender {
    MALE
    FEMALE
    UNDEFINED
  }
  type Person {
    id: ID!
    name: String!
    age: Int!
    gender: Gender
  }
`;

export const resolvers = {
  Person: {
    id: (user): string => {
      return user.getId();
    },
    name: (user): string => {
      return user.getName();
    },
    age: (user): number => {
      return user.getAge();
    },
    gender: (user): number => {
      return user.getGender();
    },
  },
};
