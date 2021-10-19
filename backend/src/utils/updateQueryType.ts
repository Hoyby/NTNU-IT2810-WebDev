import { DocumentNode, print } from 'graphql';

export function updateQueryType(query: string | DocumentNode): string {
  return typeof query === 'string' ? query : print(query);
}
