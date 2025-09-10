import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../config';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ type: 'varchar', length: 254, nullable: true, name: 'avatar_url' })
  avatarUrl: string;

  @ApiProperty({})
  @Column({ type: 'varchar', length: 254, nullable: true })
  bio: string;

  @ApiProperty({ description: 'User posts count', example: 12 })
  @Column({ type: 'int', default: 0, name: 'posts_count' })
  postsCount: number;

  @ApiProperty({ description: 'User likes count', example: 34 })
  @Column({ type: 'int', default: 0, name: 'likes_count' })
  likesCount: number;

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
