import { DocumentNode, print } from 'graphql';

export function updateQueryType(query: string | DocumentNode): string {
  if (typeof query === 'string') {
    return query;
  }
  return print(query);
}
