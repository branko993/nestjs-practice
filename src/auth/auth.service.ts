import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { UserInputType } from './models/user/user-input';
import { UserEntity } from './user.entity';
import { LoginInputType } from './models/login/login-input';
import { AuthOutputType } from './models/auth/auth-output';
import { hashPassword } from './helpers/auth.helper';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './models/jwt/payload';
import { classToPlain } from 'class-transformer';
import { UserOutputType } from './models/user/user-output';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        @Inject(REQUEST) private readonly request: Request
    ) { }

    async me() {
        const { username } = classToPlain(this.request.user);
        const user = await this.findUserByUsername(username);
        console.log(user.toJSON().Comments)
        return new UserOutputType(user);
    }

    async register(user: UserInputType) {
        const hasUser = await hashPassword(user);
        const userCreated = await this.userRepository.save({ ...hasUser });
        const payload = new PayloadType(userCreated.Username);

        const token = this.extractToken(payload.toJSON());

        return new AuthOutputType(token);
    }

    async login(credentials: LoginInputType) {
        const user = await this.findUserByUsername(credentials.Username);

        const token = await this.getToken(credentials, user);

        return token;
    }

    async getToken(credentials: LoginInputType, user: UserEntity) {

        if (!!user && await user.comparePassword(credentials.Password)) {
            const payload = new PayloadType(user.Username);

            const token = this.extractToken(payload.toJSON());

            return new AuthOutputType(token);
        }

        throw new UnauthorizedException('Invalid credentials')
    }

    async findUserByUsername(username: string) {
        return await this.userRepository.findOneOrFail({ where: { Username: username }, relations:['Comments'] });
    }

    extractToken(payload: Record<string, any>) {
        return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY, expiresIn: process.env.JWT_EXPIRATION_TIME });
    }
}
