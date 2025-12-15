import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PubSub } from 'graphql-subscriptions';

@Module({
  providers: [
    PostsResolver,
    PostsService,
    {
      provide: 'PUB_SUB',
      useFactory: () => new PubSub(),
    },
  ],
  exports: [PostsService, 'PUB_SUB'],
})
export class PostsModule {}
