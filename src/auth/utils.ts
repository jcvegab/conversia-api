import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import * as constants from './constants';
import { JwtBase } from './types';

export const generateJwtPayload = (rawUser: User, jwt: JwtService) => {
  const payload: JwtBase = { email: rawUser.email, sub: rawUser.id };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = rawUser;
  return {
    accessToken: jwt.sign(payload, {
      expiresIn: constants.JWT_ACCESS_TOKEN_EXPIRATION,
    }),
    refreshToken: jwt.sign(payload, {
      expiresIn: constants.JWT_REFRESH_TOKEN_EXPIRATION,
    }),
    user,
  };
};

export const generateJwtRefreshPayload = (
  payload: JwtBase,
  jwt: JwtService,
) => {
  return {
    accessToken: jwt.sign(payload, {
      expiresIn: constants.JWT_ACCESS_TOKEN_EXPIRATION,
    }),
  };
};
