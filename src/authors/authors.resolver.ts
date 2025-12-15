import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './models/author.model';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/models/post.model';
import { GetAuthorArgs } from './dto/get-author.args';
import { PubSub } from 'graphql-subscriptions';
import { Comment } from '../posts/models/comment.model';
import { Inject } from '@nestjs/common';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => Author, { name: 'author' })
  getAuthor(@Args() args: GetAuthorArgs) {
    const { id } = args;
    return this.authorsService.findOne(id);
  }

  @ResolveField('posts', () => [Post])
  getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }

  @Subscription(() => Comment, { name: 'commentAdded' })
  subscribeToCommentAdded() {
    return this.pubSub.asyncIterableIterator('commentAdded');
  }
}
