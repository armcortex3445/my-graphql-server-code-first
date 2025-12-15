import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './models/post.model';
import { postsMocking } from '../_mocks/posts.mock';

@Injectable()
export class PostsService {
  private posts = postsMocking;

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

  // update(id: number, updatePostInput: UpdatePostInput) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
