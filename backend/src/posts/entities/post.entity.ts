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
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PostStatus } from '../enums/post-status';
import { User } from '../../auth/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

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

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'autor_id' })
  autor: User;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  // @OneToMany(() => Comment, (comment) => comment.post)
  // comments: Comment[];

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
  updatePublishAt() {
    if (this.status === PostStatus.PUBLISHED) {
      this.publishedAt = new Date();
    }

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
