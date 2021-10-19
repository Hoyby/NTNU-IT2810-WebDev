import { DocumentNode, graphql } from 'graphql';
import { getContext } from 'src/context';
import { executableSchema } from 'src/schema';
import { updateQueryType } from './updateQueryType';
import { Request, Response } from 'express';

export async function getDataFromQuery(
  req: Request,
  res: Response,
  query: string | DocumentNode,
  args: Record<string, string | string[] | number>,
): Promise<any> {
  const data = await graphql(
    executableSchema,
    updateQueryType(query),
    undefined,
    getContext(req, res),
    args,
  );

  if (data.errors) {
    res.status(500);
  }
  return res.json(data);
}
