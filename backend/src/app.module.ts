import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { executableSchema } from './schema/schema';
import { getContext } from './context';
@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      schema: executableSchema,
      context: ({ res, req }) => getContext(req, res),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
