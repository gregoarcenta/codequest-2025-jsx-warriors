import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('comment_likes')
export class CommentLike {
  @ApiProperty({
    description: 'Comment like ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Comment, (comment) => comment.likes, { nullable: false })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @ManyToOne(() => User, (user) => user.commentsLikes, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
