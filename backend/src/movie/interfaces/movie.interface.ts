import { Document } from "mongoose";

export interface Movie extends Document {
  readonly title: string;
  readonly published: number;
  readonly description: string;
}