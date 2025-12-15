import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';
import { UpvotePostInput } from './dto/upvote-post.input';
import { Comment } from './models/comment.model';
import { AddCommentInput } from './dto/add-comment.input';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Post)
  upvotePost(@Args('upvotePostInput') upvotePostInput: UpvotePostInput) {
    const { postId } = upvotePostInput;
    return this.postsService.upvoteById(postId);
  }

  @Mutation(() => Comment)
  async addComment(@Args('addCommentInput') addCommentInput: AddCommentInput) {
    const newComment = this.postsService.addComment(addCommentInput);
    await this.pubSub.publish('commentAdded', {
      commentAdded: newComment,
    });

    return newComment;
  }
  // @Mutation(() => Post)
  // createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
  //   return this.postsService.create(createPostInput);
  // }

  // @Query(() => [Post], { name: 'posts' })
  // findAll() {
  //   return this.postsService.findAll();
  // }

  // @Query(() => Post, { name: 'post' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.postsService.findOne(id);
  // }

  // @Mutation(() => Post)
  // updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postsService.update(updatePostInput.id, updatePostInput);
  // }

  // @Mutation(() => Post)
  // removePost(@Args('id', { type: () => Int }) id: number) {
  //   return this.postsService.remove(id);
  // }
}
