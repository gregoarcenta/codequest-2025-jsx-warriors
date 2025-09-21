import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostsService } from '../posts/posts.service';
import { HandlerException } from '../common/exceptions/handler.exception';
import { PaginateDto } from '../common/dto/paginate.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly handlerException: HandlerException,
    private readonly postService: PostsService,
  ) {}

  async findAllPerPost(
    postId: string,
    paginateDto: PaginateDto,
    userId?: string,
  ) {
    const { page, limit } = paginateDto;

    // Total de comentarios raíz
    const total = await this.commentRepository
      .createQueryBuilder('c')
      .where('c.post_id = :postId', { postId })
      .andWhere('c.parent_id IS NULL')
      .andWhere('c.is_visible = :isVisible', { isVisible: true })
      .getCount();

    // Subquery para paginar solo los IDs raíz
    const idsQb = this.commentRepository
      .createQueryBuilder('c')
      .select('c.id', 'id')
      .where('c.post_id = :postId', { postId })
      .andWhere('c.parent_id IS NULL')
      .andWhere('c.is_visible = :isVisible', { isVisible: true })
      .orderBy('c.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const rootIds = (await idsQb.getRawMany()).map((r) => r.id);

    if (rootIds.length === 0) {
      return {
        comments: [],
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      };
    }

    // Cargar comentarios raíz + hijos + autores, ya filtrando por los IDs paginados
    const query = this.commentRepository
      .createQueryBuilder('comment')
      .loadRelationCountAndMap('comment.likesCount', 'comment.likes')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect(
        'comment.children',
        'childComments',
        'childComments.is_visible = :isVisible',
        { isVisible: true },
      )
      .loadRelationCountAndMap(
        'childComments.likesCount',
        'childComments.likes',
      )
      .leftJoinAndSelect('childComments.author', 'childCommentAuthor');

    if (userId) {
      query
        // Para saber si le ha dado like a un post
        .loadRelationCountAndMap(
          'comment.isLiked',
          'comment.likes',
          'commentLike',
          (qb) => qb.where('commentLike.user_id = :userId', { userId }),
        )
        .loadRelationCountAndMap(
          'childComments.isLiked',
          'childComments.likes',
          'childCommentsLike',
          (qb) => qb.where('childCommentsLike.user_id = :userId', { userId }),
        );
    }

    const comments = await query
      .where('comment.id IN (:...rootIds)', { rootIds })
      .orderBy('comment.created_at', 'DESC')
      .addOrderBy('childComments.created_at', 'DESC')
      .getMany();

    return {
      comments: comments.map((comment) => ({
        ...comment,
        isLiked: comment['isLiked'] > 0,
        children: comment.children.map((childComment) => ({
          ...childComment,
          isLiked: childComment['isLiked'] > 0,
        })),
      })),
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async createComment(
    postId: string,
    authorId: string,
    createCommentDto: CreateCommentDto,
  ) {
    await this.postService.findOne(postId);

    const { content, parentId } = createCommentDto;

    let parent: Comment | null = null;

    if (parentId) {
      parent = await this.findOne(parentId);

      const parentPostId = parent.post.id ?? undefined;
      if (parentPostId && parentPostId !== postId) {
        throw new BadRequestException(
          'Parent comment belongs to a different post',
        );
      }
    }

    const comment = this.commentRepository.create({
      content,
      post: { id: postId },
      author: { id: authorId } as any,
      parent: parent ? { id: parent.id } : null,
    });

    return await this.commentRepository.save(comment);
  }

  async findOne(id: string): Promise<Comment> {
    let comment: Comment = null;
    try {
      comment = await this.commentRepository.findOne({
        where: { id },
        relations: ['author', 'post', 'parent'],
      });
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async updateComment(
    id: string,
    authorId: string,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.findOne(id);

    if (comment.author.id !== authorId) {
      throw new ForbiddenException('You cannot edit this comment');
    }
    comment.content = updateCommentDto.content;

    try {
      await this.commentRepository.save(comment);
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    return {
      message: `Comment updated successfully`,
    };
  }

  async toggleVisibility(id: string) {
    const comment = await this.findOne(id);

    comment.isVisible = !comment.isVisible;

    try {
      await this.commentRepository.save(comment);
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    return {
      message: `Comment ${comment.isVisible ? 'visible' : 'hidden'} successfully`,
    };
  }
}
