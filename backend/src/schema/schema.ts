import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'apollo-server-core';

const typeDefs = gql`
  schema {
    query: Query
  }

  type Query {
    id: String
  }
`;

const resolvers = {
  Query: {
    id: (query) => {
      return query.id;
    },
  },
};

export const executableSchema = makeExecutableSchema({
  resolverValidationOptions: {
    requireResolversForAllFields: 'error',
    requireResolversForResolveType: 'error',
    requireResolversToMatchSchema: 'error',
  },
  inheritResolversFromInterfaces: true,
  typeDefs,
  resolvers,
});
