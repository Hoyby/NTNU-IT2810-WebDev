import { makeExecutableSchema } from '@graphql-tools/schema';
import { assertValidSchema } from 'graphql';
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

assertValidSchema(executableSchema);

//for generated types
export default executableSchema;
