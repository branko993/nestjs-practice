import { UserInputType } from "../models/user/user-input";
import * as Crypto from 'bcryptjs';

import { PASSWORD_HASH } from "../constants/user-validation";

export async function hashPassword(user: UserInputType) {
    user.Password = await Crypto.hash(user.Password, PASSWORD_HASH);
    return user;
}