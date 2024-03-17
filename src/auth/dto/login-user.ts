import { InputType, PickType } from '@nestjs/graphql';

import { CreateUserInput } from 'src/users/dto/create-user.input';

@InputType()
export class LoginUserInput extends PickType(CreateUserInput, [
  'email',
  'password',
] as const) {}
