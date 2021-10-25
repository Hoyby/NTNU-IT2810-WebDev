import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, Length, MaxLength } from "class-validator";

@InputType()
export class MovieInput{
    @Field()
    @MaxLength(30)
    readonly title: string;

    @Field({ nullable: true })
    @IsOptional()
    description?: string;
}

@InputType()
export class UpdateMovieInput{
    @Field()
    readonly _id: string;
    @Field()
    readonly title: string;
}
 
@InputType()
export class FindMovieInput{
    @Field()
    readonly _id: string;

}