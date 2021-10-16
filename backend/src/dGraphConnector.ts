import { DgraphClient, Response as dGResponse } from 'dgraph-js-http';
import { DocumentNode } from 'graphql';
import { updateQueryType } from './utils/updateQueryType';

export async function newTransaction(
  dgraphClient: DgraphClient,
  queryType: string | DocumentNode,
  variables?: Record<string, string>,
  readOnly?: boolean,
): Promise<dGResponse> {
  const query = updateQueryType(queryType);
  if (variables) {
    return dgraphClient
      .newTxn({ readOnly: readOnly ? true : false })
      .queryWithVars(query, variables);
  }
  const response = await dgraphClient.newTxn({ readOnly: true }).query(query);

  console.log(response);
  //return response;
}

export async function newMutation(
  dgraphClient: DgraphClient,
  data: Record<string, unknown>,
): Promise<dGResponse> {
  const txn = dgraphClient.newTxn();
  try {
    const response = await txn.mutate({ setJson: data });
    await txn.commit();
    return response;
  } finally {
    await txn.discard();
  }
}

export async function queryData(
  dgraphClient: DgraphClient,
  queryType: string | DocumentNode,
  vars?: Record<string, string>,
) {
  const res = await newTransaction(dgraphClient, queryType, vars, true);
  console.log(res);
  // const ppl = res.getJson();

  // console.log(`Number: ${ppl.all.length}`);
  // ppl.all.forEach((person) => console.log(person));
}

export async function dropAll(dgraphClient: DgraphClient) {
  await dgraphClient.alter({ dropAll: true });
}
