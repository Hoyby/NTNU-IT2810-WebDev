import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateMovieInput {
  @Field(() => String)
    title: String

    @Field(() => Number)
    published: Number

    @Field(() => String)
    description: String
}

@InputType()
export class UpdateMovieInput {
  @Field(() => String)
  title: MongooseSchema.Types.ObjectId;

  @Field(() => Number, { nullable: true })
  published?: number;

  @Field(() => [String], { nullable: true })
  description?: MongooseSchema.Types.ObjectId[];
}