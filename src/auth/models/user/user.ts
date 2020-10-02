import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {

    @Field(type => ID)
    Id: number;

    @Field()
    Email: string;

    @Field()
    Username: string;

    @Field()
    Password: string;

    @Field()
    Bio: string;

    @Field()
    Image: string;
}
