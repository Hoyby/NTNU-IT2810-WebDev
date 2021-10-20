import { SchemaFactory } from "@nestjs/mongoose";

export class Movie {
    title: string;
    published: number;
    description: string;
}

export type MovieDocument = Movie & Document;

export const PersonSchema = SchemaFactory.createForClass(Movie);