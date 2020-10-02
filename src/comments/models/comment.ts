import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserOutputType } from 'src/auth/models/user/user-output';

@ObjectType()
export class Comment {

    constructor(id: number, details: string, user: UserOutputType) {
        this.Id = id;
        this.Details = details;
        this.User = user;
    }

    @Field(type => ID)
    Id: number;

    @Field()
    Details: string;

    @Field(type => UserOutputType)
    User: UserOutputType;
}
