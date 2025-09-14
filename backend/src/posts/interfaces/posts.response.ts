import { ApiProperty } from '@nestjs/swagger';
import { PostResponse } from './post.response';

export class PostsResponse {
  @ApiProperty({ type: [PostResponse], description: 'List of posts' })
  posts: PostResponse[];

  @ApiProperty({
    description: 'Total number of posts matching the criteria',
    example: 10,
  })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of posts per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Total number of pages', example: 2 })
  totalPages: number;
}
