import { Field, Int, ArgsType } from '@nestjs/graphql';
import { /* IsEnum,*/ IsOptional, Min } from 'class-validator';

// enum SortOrder {
//   ASC = 'asc',
//   DESC = 'desc',
// }

@ArgsType()
export class FindAllArgs {
  @Field(() => Int, { nullable: true })
  @Min(0)
  @IsOptional()
  limit?: number;

  @Field(() => Int, { nullable: true })
  @Min(0)
  @IsOptional()
  offset?: number;

  // TODO
  // @Field(() => String, { nullable: true })
  // @IsEnum(SortOrder)
  // @IsOptional()
  // orderBy?: string;
}
