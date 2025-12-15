import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetAuthorArgs {
  @Field((type) => Int)
  id: number;
}
