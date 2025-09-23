import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contacts')
export class Contact {
  @ApiProperty({
    description: 'Contact ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of the sender',
    example: 'Alex A',
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    description: 'Email address of the sender',
    example: 'alex.a@example.com',
  })
  @Column({ type: 'varchar', length: 254 })
  email: string;

  @ApiProperty({
    description: 'Company name (optional)',
    example: 'My Company Inc.',
    required: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: true })
  company: string;

  @ApiProperty({
    description: 'Phone number (optional)',
    example: '+1234567890',
    required: false,
  })
  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @ApiProperty({
    description: 'Subject of the message',
    example: 'Inquiry about a product',
  })
  @Column({ type: 'varchar', length: 255 })
  subject: string;

  @ApiProperty({
    description: 'Content of the message',
    example: 'I would like to know more about...',
  })
  @Column({ type: 'text' })
  message: string;

  // @ApiProperty({
  //   description: 'Indicates if the message has been read',
  //   example: false,
  // })
  // @Column({ type: 'boolean', default: false })
  // isRead: boolean;

  @ApiProperty({
    description: 'Timestamp when the message was created',
    example: '2024-11-08T22:51:11.862Z',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the message was last updated',
    example: '2024-11-08T22:51:11.862Z',
  })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
