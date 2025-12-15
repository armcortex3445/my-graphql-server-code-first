import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';
import { postsMocking } from '../_mocks/posts.mock';
import { GraphQLError } from 'graphql/error';
import { Comment } from './models/comment.model';
import { AddCommentInput } from './dto/add-comment.input';

@Injectable()
export class PostsService {
  private posts: Post[] = postsMocking;
  commentId = 1;

  // create(createPostInput: CreatePostInput) {
  //   return 'This action adds a new post';
  // }

  findAll(conditions?: { authorId: number }) {
    if (conditions) {
      return this.posts.filter((post) => post.authorId);
    }

    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  upvoteById(id: number) {
    const post = this.findOne(id);

    if (!post) {
      throw new GraphQLError(`Not Found post ${id}`);
    }

    post.votes++;

    return post;
  }

  addComment(input: AddCommentInput) {
    const { postId, content } = input;
    const post = this.findOne(postId);

    if (!post) {
      throw new GraphQLError(`Not Found post ${postId}`);
    }
    const newComment = { id: this.commentId++, content };
    post.comments.push(newComment);

    return newComment;
  }

  // update(id: number, updatePostInput: UpdatePostInput) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
