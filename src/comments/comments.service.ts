import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CommentEntity } from './comments.entity';
import { classToPlain } from 'class-transformer';
import { AuthService } from '../auth/auth.service';
import { CommentsOutputType } from './models/comments-output';
import { Comment } from './models/comment';
import { UserOutputType } from 'src/auth/models/user/user-output';

@Injectable({ scope: Scope.REQUEST })
export class CommentsService {

    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentsRepository: Repository<CommentEntity>,
        @Inject(REQUEST) private readonly request: Request,
        private readonly authService: AuthService
    ) { }

    async commentsByUser() {
        const { username } = classToPlain(this.request.user);
        const user = await this.authService.findUserByUsername(username);
        const comments = await this.commentsRepository.find({ where: { user: user }, relations: ['user'] });

        const commentsList = comments.map((comment) => { return new Comment(comment.Id, comment.Details, new UserOutputType(comment.toJSON().user)) });

        return new CommentsOutputType(commentsList);
    }

}
