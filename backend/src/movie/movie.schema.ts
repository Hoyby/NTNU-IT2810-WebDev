import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const MovieSchema = new mongoose.Schema({
    title: String,
    published: Number,
    description: String,
});

@Schema()
export class Movie extends Document {
  @Prop()
  title: String;

  @Prop()
  published: Number;

  @Prop()
  description: String;
}