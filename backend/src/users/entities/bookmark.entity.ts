import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../../posts/entities/post.entity';
import { User } from './user.entity';

@Entity('bookmarks')
export class Bookmark {
  @ApiProperty({
    description: 'Bookmark id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post, (post) => post.bookmarks, { nullable: false })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.bookmarks, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
