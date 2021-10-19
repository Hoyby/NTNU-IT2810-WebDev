import { DgraphClient, DgraphClientStub } from 'dgraph-js';
import { credentials } from '@grpc/grpc-js';
export class DGraphConnector {
  readonly dGraphClientStub: DgraphClientStub;
  readonly dGraphClient: DgraphClient;

  constructor() {
    this.dGraphClientStub = new DgraphClientStub(
      'localhost:8090',
      credentials.createInsecure(),
    );
    this.dGraphClient = new DgraphClient(this.dGraphClientStub);
  }

  public getClient(): DgraphClient {
    return this.dGraphClient;
  }
}
