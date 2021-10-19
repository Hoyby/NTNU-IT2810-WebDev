import { Injectable } from '@nestjs/common';
import { DgraphClient, DgraphClientStub } from 'dgraph-js';
import { DGraphLoader } from './data-loaders/dGraph';

const dgraphClient = new DgraphClient(
  new DgraphClientStub('http://localhost:8090"'),
);
console.log(dgraphClient);

const query = `
  {
    find_movie(func: eq(name, "Star Wars Episode IV")) {
      uid
      name
      year
      cast {
        name
        age
      }
      director {
        name
        age
      }
  }
`;

@Injectable()
export class AppService {
  queryData() {
    const res = new DGraphLoader().queryData(query);
    console.log(res);
  }
}
