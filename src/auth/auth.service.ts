import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { generateJwtPayload, generateJwtRefreshPayload } from './utils';

import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.finOneByEmail(email);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    delete user.password;
    return user;
  }

  async login(user: User) {
    return generateJwtPayload(user, this.jwtService);
  }

  async signup(signupUserInput: CreateUserInput) {
    const user = await this.usersService.finOneByEmail(signupUserInput.email);
    if (user) throw new Error('User already exists');
    const createdUser = await this.usersService.create(signupUserInput);
    return generateJwtPayload(createdUser, this.jwtService);
  }

  async refresh(token: string) {
    const decoded = this.jwtService.verify<JwtPayload>(token);
    // TOCHECK: jti
    return generateJwtRefreshPayload(
      { email: decoded.email, sub: decoded.sub },
      this.jwtService,
    );
  }
}
