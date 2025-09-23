import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('subscribers')
export class Subscriber {
  @ApiProperty({
    description: 'Subscriber ID',
    example: 'c2a2e0a9-3e0b-4f2f-b4c9-2c1f5c9b4b77',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Subscriber email address',
    example: 'alex.a@example.com',
  })
  @Column({ type: 'varchar', length: 254, unique: true })
  email: string;

  @ApiProperty({
    description: 'Unique token for email confirmation',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Column({ type: 'varchar', unique: true, name: 'confirmation_token' })
  confirmationToken: string;

  @ApiProperty({
    description: 'Indicates if the email has been confirmed',
    example: false,
  })
  @Column({ type: 'boolean', default: false, name: 'is_confirmed' })
  isConfirmed: boolean;

  @ApiProperty({
    description: 'Timestamp when the email was confirmed',
    example: '2025-09-21T18:30:00.000Z',
  })
  @Column({ type: 'timestamptz', nullable: true, name: 'confirmed_at' })
  confirmedAt: Date;

  @ApiProperty({
    description: 'Timestamp when the subscription was created',
    example: '2025-09-21T18:30:00.000Z',
  })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
}
