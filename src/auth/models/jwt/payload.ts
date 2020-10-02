import { Field, ObjectType } from '@nestjs/graphql';
import { classToPlain } from 'class-transformer';

@ObjectType()
export class PayloadType {
    constructor(username: string) {
        this.username = username;
    }

    @Field()
    username: string;

    toJSON() {
        return classToPlain(this);
    }
}
