import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../../posts/entities/post.entity';

@Entity('categories')
export class Category {
  @ApiProperty({
    description: 'Categopry id',
    example: '550e8400-e29b-41d4-a716-446655440000',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Frontend',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @ApiProperty({
    description: 'Category description',
    example: 'React, Vue, Angular y más tecnologías frontend',
  })
  @Column({ type: 'varchar', length: 254, nullable: true })
  description: string;

  @ApiProperty({
    description: 'Category isFeatured',
    example: false,
    default: false,
  })
  @Column({ type: 'boolean', default: false, name: 'is_featured' })
  isFeatured: boolean;

  @ApiProperty({
    description: 'Category isActive',
    example: false,
    default: false,
  })
  @Column({ type: 'boolean', default: false, name: 'is_active' })
  isActive: boolean;

  @ApiProperty({
    description: 'Category created at',
    example: '2024-11-08T22:51:11.862Z',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Category updated at',
    example: '2024-11-08T22:51:11.862Z',
  })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
