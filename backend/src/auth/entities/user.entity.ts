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
}
