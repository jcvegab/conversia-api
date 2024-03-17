import { User as UserI } from '@prisma/client';

import { ObjectType, Field } from '@nestjs/graphql';

import { UuidScalar } from 'src/scalar/uuid';

@ObjectType()
export class User implements Omit<UserI, 'password'> {
  @Field(() => UuidScalar)
  id: string;

  @Field()
  fullName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  imageUrl: string | null;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
