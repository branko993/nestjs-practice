import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthOutputType {
    constructor(token: string) {
        this.access_token = token;
    }

    @Field()
    access_token: string;
}
