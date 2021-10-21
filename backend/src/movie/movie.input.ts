import { Field, InputType, Int } from "type-graphql";

@InputType()
export class MovieInput{
    @Field()
    readonly title: string;
    @Field(() => Int)
    readonly published: number;
    @Field()
    readonly description: string;
}