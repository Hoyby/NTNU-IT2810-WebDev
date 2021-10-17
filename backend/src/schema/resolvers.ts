import { mergeResolvers } from '@graphql-tools/merge';
import { resolvers as Movie } from './Movie';
import { resolvers as Person } from './Person';
import { resolvers as Query } from './Query';
import { resolvers as Actor } from './Actor';

export const resolvers = mergeResolvers([Query, Movie, Person, Actor]);
