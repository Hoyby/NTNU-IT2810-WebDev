import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { FindMovieInput, MovieInput, UpdateMovieInput } from './input/movie.input';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async create(createMovie: MovieInput): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovie);
    return createdMovie.save();
  }

  async findOne(movie: FindMovieInput): Promise<Movie> {
    return this.movieModel.findById(movie._id);
  }

  async update(updateMovie: UpdateMovieInput): Promise<Movie> {
    const movie = await this.movieModel.findOne(new Types.ObjectId(updateMovie._id))
    movie.title = updateMovie.title
    movie.updatedAt = new Date()
    return movie.save()

  }

  async delete(_id: string): Promise<any> {
    return await this.movieModel.deleteOne({_id: new Types.ObjectId(_id)});
  }

  
}
