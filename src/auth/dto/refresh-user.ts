import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshUserInput {
  @Field()
  refresh: string;
}
