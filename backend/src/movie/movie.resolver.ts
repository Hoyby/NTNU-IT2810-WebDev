import { Args, Mutation, Resolver, Query } from '@nestjs/graphql'
import { MovieService } from './movie.service'
import { Movie } from './movie.schema'
import { MovieDto } from './dto/movie.dto'
import {
    FindMovieInput,
    MovieInput,
    UpdateMovieInput,
} from './input/movie.input'

@Resolver(() => Movie)
export class MovieResolver {
    constructor(private movieService: MovieService) {}

    @Query(() => [MovieDto])
    async getmovies() {
        return this.movieService.findAll()
    }

    @Mutation(() => MovieDto)
    async createMovie(@Args('input') input: MovieInput) {
        return this.movieService.create(input)
    }

    @Query(() => MovieDto)
    async findMovie(@Args('input') input: FindMovieInput) {
        return this.movieService.findOne(input)
    }

    @Mutation(() => MovieDto)
    async updateMovie(@Args('input') input: UpdateMovieInput) {
        return this.movieService.update(input)
    }

    @Mutation(() => Boolean)
    async deleteMovie(@Args('input') input: FindMovieInput): Promise<any> {
        await this.movieService.delete(input._id)
        return true
    }

    @Query(() => [MovieDto])
    async searchMovie(@Args('input') input: string){
        return this.movieService.search(input)
    }

    @Query(() => [MovieDto])
    async sortMovie(@Args('input') input: number){
        return this.movieService.order(input)
    }
}
