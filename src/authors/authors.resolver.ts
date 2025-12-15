import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './models/author.model';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/models/post.model';
import { GetAuthorArgs } from './dto/get-author.args';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
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
}
