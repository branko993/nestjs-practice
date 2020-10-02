import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment';

@ObjectType()
export class CommentsOutputType {
    constructor(comments: Comment[]) {
        this.comments = comments;
    }

    @Field(type => [Comment])
    comments: Comment[];
}
