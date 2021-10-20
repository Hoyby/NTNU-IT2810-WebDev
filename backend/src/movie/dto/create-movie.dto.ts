import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class CreateMovieDto {
  @Field()
  readonly title: string;
  @Field(() => Int)
  readonly published: number;
  @Field()
  readonly description: string;
  }