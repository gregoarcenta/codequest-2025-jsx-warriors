import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Post } from '../posts/entities/post.entity';
import { Comment } from '../comments/entities/comment.entity';
import { CATEGORIES_DATA } from '../data/categories.data';
import { USERS_DATA } from '../data/users.data';
import { POST_DATA } from '../data/posts.data';
import { COMMENTS_DATA } from '../data/comments.data';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly configService: ConfigService,
  ) {}
  async onModuleInit() {
    if (this.configService.get('NODE_ENV') === 'development') {
      await this.seedDatabase();
    }
  }
  async seedDatabase() {
    console.log('Verificando la base de datos para seeding...');

    const usersCount = await this.userRepository.count();
    const categoriesCount = await this.categoryRepository.count();

    // Si ya hay usuarios o categorías, omitimos el seeding
    if (usersCount > 0 || categoriesCount > 0) {
      console.log('La base de datos ya contiene datos. Seeding omitido.');
      return;
    }

    console.log('Iniciando el proceso de seeding...');

    // Usuarios
    const savedUsers = await this.userRepository.save(USERS_DATA);
    console.log('Usuarios creados:', savedUsers.length);

    // Categorías
    const savedCategories = await this.categoryRepository.save(CATEGORIES_DATA);
    console.log('Categorías creadas:', savedCategories.length);

    // Posts
    const savedPost = await this.postRepository.save(POST_DATA);
    console.log('Posts creados:', savedPost.length);

    //Comentarios
    const savedComments = await this.commentRepository.save(COMMENTS_DATA);
    console.log('Comentarios creados:', savedComments.length);

    console.log('Proceso de seeding completado con éxito.');
  }
}
