import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field((type) => ID)
  id: number;

  @Field()
  content: string;
}
