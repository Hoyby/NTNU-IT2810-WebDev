import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { executableSchema } from './schema/schema';
// import { DgraphModule } from '@valsamonte/nestjs-dgraph';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      schema: executableSchema,
    }),
    // DgraphModule.forRoot({
    //   stubs: [
    //     {
    //       address: 'localhost:8090',
    //     },
    //   ],
    //   debug: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
