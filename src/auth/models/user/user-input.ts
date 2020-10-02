import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

import { EMAIL_MIN_LENGTH, PASWORD_MIN_LENGTH, PASWORD_MAX_LENGTH, USERNAME_MIN_LENGTH } from 'src/auth/constants/user-validation';

@InputType()
export class UserInputType {

    @Field()
    @IsEmail()
    @IsString()
    @MinLength(EMAIL_MIN_LENGTH)
    Email: string;

    @Field()
    @IsString()
    @MinLength(USERNAME_MIN_LENGTH)
    Username: string;

    @Field()
    @IsString()
    @MinLength(PASWORD_MIN_LENGTH)
    @MaxLength(PASWORD_MAX_LENGTH)
    Password: string;

    @Field({ nullable: true })
    Bio: string;

    @Field({ nullable: true })
    Image: string;
}
