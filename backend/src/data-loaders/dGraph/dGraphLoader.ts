import { DGraphConnector } from './dGraphConnector';
import { Response as dGResponse, Mutation, Operation } from 'dgraph-js';
import { DocumentNode } from 'graphql';
import { updateQueryType } from '../../utils/updateQueryType';
import { gql } from 'apollo-server-express';

export type queryVarType = Record<string, unknown>;

export class DGraphLoader {
  readonly dGraph: DGraphConnector;

  constructor() {
    this.dGraph = new DGraphConnector();
  }

  public getActors() {
    const query = gql`
      {
        Actor {
          name
        }
      }
    `;
    return this.queryData(query);
  }

  private mapReadOnly(readOnly?: boolean): boolean {
    if (!readOnly) {
      return false;
    }
    return readOnly;
  }

  public async newTransaction(
    queryType: string | DocumentNode,
    variables?: queryVarType,
    readonly?: boolean,
  ): Promise<dGResponse> {
    const query = updateQueryType(queryType);

    let response: dGResponse;
    if (variables) {
      response = await this.dGraph
        .getClient()
        .newTxn({ readOnly: this.mapReadOnly(readonly) })
        .queryWithVars(query, variables);
    }
    response = await this.dGraph
      .getClient()
      .newTxn({ readOnly: this.mapReadOnly(readonly) })
      .query(query);

    return response;
  }

  public async newMutation(data: Record<string, unknown>) {
    const txn = this.dGraph.getClient().newTxn();
    try {
      const mu = new Mutation();
      mu.setSetJson(data);
      const response = await txn.mutate(mu);
      await txn.commit();
      return response;
    } finally {
      await txn.discard();
    }
  }

  public async queryData(
    queryType: string | DocumentNode,
    vars?: Record<string, string>,
  ) {
    const res = await this.newTransaction(queryType, vars, true);
    console.log(res);
    return res.getJson();
  }

  public async dropAll() {
    const op = new Operation();
    op.setDropAll(true);
    await this.dGraph.getClient().alter(op);
  }
}
