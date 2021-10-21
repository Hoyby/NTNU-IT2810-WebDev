import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateMovieDto {
  @Field()
  readonly title: string;
  @Field(() => Int)
  readonly published: number;
  @Field()
  readonly description: string;
  }