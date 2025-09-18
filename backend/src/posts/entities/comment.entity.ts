import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Post } from './post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class Comment {
  @ApiProperty({
    description: 'Comment ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Comment content',
    example: 'This is a comment',
  })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({
    description: 'Comment isVisible',
    example: true,
    default: true,
  })
  @Column({ type: 'boolean', default: true, name: 'is_visible' })
  isVisible: boolean;

  @Index('idx_comments_post_id')
  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Index('idx_comments_parent_id')
  @ManyToOne(() => Comment, (comment) => comment.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: Comment | null;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];

  @ApiProperty({
    description: 'Comment created at',
    example: '2024-11-08T22:51:11.862Z',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Comment updated at',
    example: '2024-11-08T22:51:11.862Z',
  })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
