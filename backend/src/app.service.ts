import { Injectable } from '@nestjs/common';
import { DgraphClient, DgraphClientStub } from 'dgraph-js-http';
//import { queryData } from './dGraphConnector';

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
    //void queryData(dgraphClient, query);
  }
}
