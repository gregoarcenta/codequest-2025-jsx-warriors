import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../config';
import { ApiProperty } from '@nestjs/swagger';
import { PostLike } from '../../posts/entities/likes.entity';
import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../posts/entities/comment.entity';
import { Bookmark } from './bookmark.entity';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'User id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User discordId',
    example: '906094772663091331',
    uniqueItems: true,
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
    name: 'discord_id',
  })
  discordId: string;

  @ApiProperty({
    description: 'User fullName',
    example: 'user full name',
  })
  @Column({ type: 'varchar', length: 150, name: 'full_name' })
  fullName: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60, select: false, nullable: true })
  password: string;

  @ApiProperty({
    description: 'Avatar URL',
    example: 'https://res.cloudinary.com/.../avatar.png',
  })
  @Column({ type: 'text', nullable: true, name: 'avatar_url' })
  avatarUrl: string;

  @ApiProperty({ description: 'User bio', example: 'This is my bio' })
  @Column({ type: 'varchar', length: 254, nullable: true })
  bio: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  likes: PostLike[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @ApiProperty({
    description: 'User isActive',
    example: true,
    default: true,
  })
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @ApiProperty({
    description: 'User roles',
    example: ['user'],
    default: ['user'],
  })
  @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  roles: Role[];

  @ApiProperty({
    description: 'User last login',
    example: '2025-09-10T15:00:00.000Z',
  })
  @Column({ type: 'timestamptz', nullable: true, name: 'last_login_at' })
  lastLoginAt: Date;

  @ApiProperty({
    description: 'User created at',
    example: '2024-11-08T22:51:11.862Z',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'User updated at',
    example: '2024-11-08T22:51:11.862Z',
  })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
