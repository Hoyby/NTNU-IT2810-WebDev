import { Document } from "mongoose";

export interface IMovie extends Document {
  readonly title: string;
  readonly published: number;
  readonly description: string;
}