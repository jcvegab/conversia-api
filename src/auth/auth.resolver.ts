import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from './guards/gql-auth.guard';
import { AuthService } from './auth.service';

import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user';

import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';

@Resolver()
@UseGuards(GqlAuthGuard)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  // @Mutation(() => User)
  // refresh(@Args('signupUserInput') signupUserInput: CreateUserInput) {
  //   return this.authService.signup(signupUserInput);
  // }

  @Mutation(() => User)
  signup(@Args('signupUserInput') signupUserInput: CreateUserInput) {
    return this.authService.signup(signupUserInput);
  }

  // @Mutation(() => User)
  // logout(@Context() context) {
  //   // return this.authService.logout(context.req);
  // }
}
