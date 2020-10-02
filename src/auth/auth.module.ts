import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy.service';
import { UserEntity } from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            }
        }),
        PassportModule.register({defaultStrategy: process.env.AUTH_STRATEGY})
    ],
    providers: [AuthService, AuthResolver, JwtStrategy],
    exports: [PassportModule, JwtStrategy]
})
export class AuthModule { }
