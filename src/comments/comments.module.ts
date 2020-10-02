import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentEntity } from './comments.entity';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/auth/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentEntity, UserEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }
        })
    ],
    providers: [AuthService, CommentsService, CommentsResolver]
})
export class CommentsModule {}
