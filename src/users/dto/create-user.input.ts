import { InputType, Field } from '@nestjs/graphql';
import { UserCreatePayload } from '../types';
import { UuidScalar } from 'src/scalar/uuid';

@InputType()
export class CreateUserInput implements UserCreatePayload {
  @Field(() => UuidScalar, { nullable: true })
  id: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  imageUrl: string | null;
}
