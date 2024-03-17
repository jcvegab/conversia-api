import { InputType, Field } from '@nestjs/graphql';
import { UuidScalar } from 'src/scalar/uuid';

import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserCreatePayload } from '../types';

@InputType()
export class CreateUserInput implements UserCreatePayload {
  @Field(() => UuidScalar, { nullable: true })
  @IsUUID()
  @IsOptional()
  id?: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  fullName: string;

  @Field()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @Field()
  @MaxLength(64)
  password: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  imageUrl: string | null;
}
