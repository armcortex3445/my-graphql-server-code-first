import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddCommentInput {
  @Field((type) => Int)
  postId: number;
  @Field()
  content: string;
}
