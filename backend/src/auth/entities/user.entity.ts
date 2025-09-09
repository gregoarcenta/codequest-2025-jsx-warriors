import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
    description: 'User fullName',
    example: 'user full name',
  })
  @Column({ type: 'varchar', length: 150 })
  fullName: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
    uniqueItems: true,
  })
  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60, select: false })
  password: string;

  @ApiProperty({
    description: 'User isActive',
    example: true,
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'User roles',
    example: ['user'],
    default:['user'],
  })
  @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
  roles: Role[];
}
