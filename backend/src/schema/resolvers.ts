import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as Movie } from './Movie';
import { resolvers as Person } from './Person';

export const resolvers = mergeResolvers([Movie, Person]);
