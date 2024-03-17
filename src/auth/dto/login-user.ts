import { Field, InputType } from '@nestjs/graphql';

import { User } from '@prisma/client';

@InputType()
export class LoginUserInput implements Pick<User, 'email' | 'password'> {
  @Field()
  email: string;

  @Field()
  password: string;
}
