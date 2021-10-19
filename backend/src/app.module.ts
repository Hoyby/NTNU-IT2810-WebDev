import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { executableSchema } from './schema/schema';
import { getContext } from './context';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { createServer } from 'http';
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      schema: executableSchema,
      context: ({ res, req }) => getContext(req, res),
      plugins: [
        ApolloServerPluginDrainHttpServer({
          httpServer: createServer(this),
        }),
      ],
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
