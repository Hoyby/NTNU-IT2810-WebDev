import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

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
