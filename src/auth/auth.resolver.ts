import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AuthService } from './auth.service';

import { LoginUserInput } from './dto/login-user';
import { LoginResponse } from './dto/login-response';
import { RefreshUserInput } from './dto/refresh-user';
import { RefreshResponse } from './dto/refresh-response';

import { CreateUserInput } from 'src/users/dto/create-user.input';
import { GqlAuthRefreshGuard } from './guards/gql-refresh-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => LoginResponse)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => LoginResponse)
  signup(@Args('signupUserInput') signupUserInput: CreateUserInput) {
    return this.authService.signup(signupUserInput);
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => RefreshResponse)
  refresh(
    @Args('refreshUserInput') refreshUserInput: RefreshUserInput,
    @Context() context,
  ) {
    return this.authService.refresh(context.body.refresh);
  }
}
