import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('password_reset_tokens')
export class PasswordResetToken {

    @ApiProperty({
        description: 'ID del registro',
        example: 'c2a2e0a9-3e0b-4f2f-b4c9-2c1f5c9b4b77',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Usuario asociado al token',
        type: () => User,
    })
    @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ApiProperty({
        description: 'ID del usuario',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @Column({ type: 'uuid', name: 'user_id' })
    userId: string;

    @ApiProperty({
        description: 'Identificador (jti) único del JWT asociado',
        example: 'c3d3c0b8-1f9d-4b90-bf7f-2f3a6b5b0a11',
    })
    @Index({ unique: true })
    @Column({ type: 'uuid', name: 'jwt_id' })
    jwtId: string;

    @ApiProperty({
        description: 'Indica si el token ya fue utilizado',
        example: false,
        default: false,
    })
    @Column({ type: 'boolean', name: 'is_used', default: false })
    isUsed: boolean;

    @ApiProperty({
        description: 'Fecha/hora de expiración',
        example: '2025-09-21T18:45:00.000Z',
    })
    @Index()
    @Column({ type: 'timestamptz', name: 'expires_at' })
    expiresAt: Date;

    @ApiProperty({
        description: 'Fecha/hora en que se usó el token (si aplica)',
        example: null,
        nullable: true,
    })
    @Column({ type: 'timestamptz', name: 'used_at', nullable: true })
    usedAt: Date | null;

    @ApiProperty({
        description: 'Fecha de creación del registro',
        example: '2025-09-21T18:30:00.000Z',
    })
    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date;

    @ApiProperty({
        description: 'Fecha de última actualización del registro',
        example: '2025-09-21T18:30:00.000Z',
    })
    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updatedAt: Date;

}