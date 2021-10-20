import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MovieModule } from './movie/movie.module';
import { DatabaseModule } from './database/database.module';
import { join } from 'path';
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    ConfigModule,
    DatabaseModule,
    // MovieModule,
  ],
})
export class AppModule { }