import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';
import { Category } from '../../categories/entities/category.entity';
import { User } from '../../auth/entities/user.entity';

class AuthorResponse extends PickType(User, ['id', 'fullName']) {}

class CategoryResponse extends PickType(Category, ['id', 'name']) {}

export class PostResponse extends OmitType(Post, [
  'author',
  'category',
  'changeSlugOnTitleChange',
  'updatePublishAtOnStatusChange',
] as const) {
  @ApiProperty({ description: 'Author post', type: AuthorResponse })
  author: AuthorResponse;
  @ApiProperty({ description: 'Category post', type: CategoryResponse })
  category: CategoryResponse;
}
