import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { PASWORD_MIN_LENGTH, PASWORD_MAX_LENGTH } from 'src/auth/constants/user-validation';

@InputType()
export class LoginInputType {

    constructor(username: string, password: string) {
        this.Username = username;
        this.Password = password;
    }

    @Field()
    @IsString()
    Username: string;

    @Field()
    @IsString()
    @MinLength(PASWORD_MIN_LENGTH)
    @MaxLength(PASWORD_MAX_LENGTH)
    Password: string;
}
