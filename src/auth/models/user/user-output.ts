import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class UserOutputType {
    constructor(user: User) {
        this.Email = user.Email;
        this.Username = user.Username;
        this.Bio = user.Bio;
        this.Image = user.Image;
    }

    @Field()
    Email: string;

    @Field()
    Username: string;

    @Field({ nullable: true })
    Bio: string;

    @Field({ nullable: true })
    Image: string;
    
}
