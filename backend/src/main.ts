import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { queryData } from './dGraphConnector';
import { DgraphClient, DgraphClientStub } from 'dgraph-js-http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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

  await queryData(dgraphClient, query);

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
