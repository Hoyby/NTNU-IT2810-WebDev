import { typeDefs as Movie } from './Movie';
import { typeDefs as Person } from './Person';

import { mergeTypeDefs } from '@graphql-tools/merge';

export const resolvers = mergeTypeDefs([Movie, Person]);
