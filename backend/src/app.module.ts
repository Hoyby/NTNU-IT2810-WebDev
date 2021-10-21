import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
// import { MovieModule } from './movie/movie.module';
// import { Movie } from './movie/movie.schema';
import { RecipesModule } from './recipes/recipes.module';


@Module({
  imports: [
    RecipesModule,
    MongooseModule.forRoot(
    `mongodb://mongodb:27017/DB`
    ,),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),
  ],
})
export class AppModule {}
