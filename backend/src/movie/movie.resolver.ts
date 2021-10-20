import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateMovieInput } from './movie.input';
import { MovieService } from './movie.service';
import { Movie } from './movie.schema';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Mutation(() => Movie)
  async createMovie(@Args('input') payload: CreateMovieInput) {
    return this.movieService.create(payload);
  }

  @Query(() => [Movie])
  async movies() {
    return this.movieService.findAll();
  }
}