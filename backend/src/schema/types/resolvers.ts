import type { IContext } from '../../context';
import type { IResolvers as IGraphQLToolsResolvers } from '@graphql-tools/utils';
import { mergeResolvers as GraphQLToolsMergeResolvers } from '@graphql-tools/merge';

export type IResolvers<
  TSource = any,
  TArgs = Record<string, any>,
> = IGraphQLToolsResolvers<TSource, IContext, TArgs>;

export function mergeResolvers(resolvers: IResolvers[]) {
  return GraphQLToolsMergeResolvers<IContext, any>(resolvers);
}
