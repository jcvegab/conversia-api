import { InputType, Field, PartialType } from '@nestjs/graphql';

import { UuidScalar } from 'src/scalar/uuid';

import { CreateUserInput } from './create-user.input';
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => UuidScalar, { nullable: true })
  id: string;
}
