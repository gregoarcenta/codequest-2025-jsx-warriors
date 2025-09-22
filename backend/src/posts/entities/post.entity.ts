import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PostStatus } from '../enums/post-status';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Bookmark } from '../../users/entities/bookmark.entity';
import { PostLike } from '../../likes/entities/postLike.entity';

@Entity('posts')
export class Post {
  @ApiProperty({
    description: 'Post ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Post title',
    example: 'Post title',
    uniqueItems: true,
    minLength: 3,
    maxLength: 150,
  })
  @Column({ type: 'varchar', length: 150, unique: true })
  title: string;

  @ApiProperty({
    description: 'Post slug',
    example: 'post-title',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 254, unique: true })
  slug: string;

  @ApiProperty({
    description: 'Post content',
    example: 'This is a post content',
  })
  @Column({ type: 'text', nullable: true })
  content: string;

  @ApiProperty({
    description: 'Post cover image URL',
    example: 'https://example.com/cover.jpg',
  })
  @Column({ type: 'text', nullable: true, name: 'cover_image_url' })
  coverImageUrl?: string;

  @ApiProperty({
    description: 'Post status',
    example: 'draft',
    enum: PostStatus,
    default: 'draft',
  })
  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.DRAFT })
  status: PostStatus;

  @ApiProperty({
    description: 'Post featured status',
    example: false,
    default: false,
  })
  @Column({ type: 'boolean', default: false, name: 'is_featured' })
  isFeatured: boolean;

  @ManyToOne(() => User, { eager: true, nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  likes: PostLike[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.post)
  bookmarks: Bookmark[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ApiProperty({
    description: 'Views count',
    example: 0,
    default: 0,
  })
  @Column({ type: 'int', default: 0, name: 'views_count' })
  viewsCount: number;

  @ApiProperty({
    description: 'Post published date',
    example: '2024-11-08T22:51:11.862Z',
  })
  @Column({ type: 'timestamptz', nullable: true, name: 'published_at' })
  publishedAt: Date;

  @ApiProperty({
    description: 'Post created at',
    example: '2024-11-08T22:51:11.862Z',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Post updated at',
    example: '2024-11-08T22:51:11.862Z',
  })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  changeSlugOnTitleChange() {
    this.slug = this.generateSlug(this.title);
  }

  private generateSlug(title: string): string {
    return title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
