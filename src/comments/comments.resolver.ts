import { Query, Resolver, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CommentsService } from './comments.service';
import { CommentsOutputType } from './models/comments-output';

@Resolver()
export class CommentsResolver {

    constructor(
        private readonly commentsService: CommentsService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Query(returns => CommentsOutputType)
    commentsByUser() {
        return this.commentsService.commentsByUser();
    }
}
