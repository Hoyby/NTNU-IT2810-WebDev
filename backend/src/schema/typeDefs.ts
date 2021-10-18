import { mergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs as Query } from './Query';
import { typeDefs as Movie } from './Movie';
import { typeDefs as Person } from './Person';
import { typeDefs as Actor } from './Actor';

export const typeDefs = mergeTypeDefs([Query, Person, Actor, Movie]);
