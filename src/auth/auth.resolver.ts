import { Query, Resolver, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginInputType } from './models/login/login-input';
import { User } from './models/user/user';
import { UserInputType } from './models/user/user-input';
import { UserOutputType } from './models/user/user-output';
import { AuthOutputType } from './models/auth/auth-output';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver(of => User)
export class AuthResolver {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Query(returns => UserOutputType)
    me() {
        return this.authService.me();
    }

    @Mutation(returns => AuthOutputType)
    async register(
        @Args({ name: 'userInput', type: () => UserInputType }) user: UserInputType,
    ) {
        return this.authService.register(user);
    }

    @Mutation(returns => AuthOutputType)
    async login(
        @Args({ name: 'loginInput', type: () => LoginInputType }) credentials: LoginInputType,
    ) {
        return this.authService.login(credentials);
    }
}
