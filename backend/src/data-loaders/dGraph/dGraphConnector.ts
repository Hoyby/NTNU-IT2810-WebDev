import {
  DgraphClient,
  DgraphClientStub,
  Response as dGResponse,
} from 'dgraph-js-http';
import { DocumentNode } from 'graphql';
import { updateQueryType } from '../../utils/updateQueryType';

export type queryVarType = Record<string, unknown>;
export class DGraphConnector {
  readonly dGraphClientStub: DgraphClientStub;
  readonly dGraphClient: DgraphClient;

  constructor() {
    this.dGraphClientStub = new DgraphClientStub('http:localhost:8090');
    this.dGraphClient = new DgraphClient(this.dGraphClientStub);
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
      response = await this.dGraphClient
        .newTxn({ readOnly: this.mapReadOnly(readonly) })
        .queryWithVars(query, variables);
    }
    response = await this.dGraphClient
      .newTxn({ readOnly: this.mapReadOnly(readonly) })
      .query(query);

    console.log(response);
    return response;
  }

  public async newMutation(data: Record<string, unknown>) {
    const txn = this.dGraphClient.newTxn();
    try {
      const response = await txn.mutate({ setJson: data });
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
  }

  public async dropAll() {
    await this.dGraphClient.alter({ dropAll: true });
  }
}
