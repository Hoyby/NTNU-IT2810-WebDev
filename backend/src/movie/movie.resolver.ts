import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieInput } from './movie.input';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(
    private readonly movieService: MovieService,
    ) {}

  @Mutation(() => Movie)
  async createMovie(@Args('input') input: MovieInput) {
    return this.movieService.create(input);
  }

  @Query(() => [CreateMovieDto])
  async movies() {
    return this.movieService.findAll();
  }
}