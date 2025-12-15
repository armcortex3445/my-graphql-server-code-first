import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';

@ObjectType()
export class Post {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field((type) => Int)
  votes: number;

  @Field((type) => [Comment], { nullable: 'items' })
  comments: Comment[];

  authorId: number;
}
