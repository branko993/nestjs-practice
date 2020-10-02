import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Repository } from "typeorm";
import { AuthPayload } from "./models/auth/authPayload";
import { UserEntity } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>

    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
            secretOrKey: process.env.JWT_SECRET_KEY,
        })
    }

    async validate(payload: AuthPayload) {
        const { username } = payload;
        const user = await this.userRepository.findOneOrFail({ where: { Username: username } });
        return user;
    }
}