import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateMovieInput } from './movie.input';
import { Movie } from './movie.schema';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}


  async create(payload: CreateMovieInput) {
    const createdPerson = new this.movieModel(payload);
    return createdPerson.save();
  }

  async findOne(query: FilterQuery<Movie>): Promise<Movie> {
    return this.movieModel.findOne(query).lean();
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().lean();
  }
}