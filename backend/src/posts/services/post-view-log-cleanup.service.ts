import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostViewLog } from '../entities/post-view-log.entity';

@Injectable()
export class PostViewLogCleanupService {
  private readonly logger = new Logger(PostViewLogCleanupService.name);

  constructor(
    @InjectRepository(PostViewLog)
    private readonly logRepository: Repository<PostViewLog>,
  ) {}

  // Runs every day at midnight server time
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Running views cleanup job...');
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    try {
      const result = await this.logRepository
        .createQueryBuilder()
        .delete()
        .from(PostViewLog)
        .where('createdAt < :date', { date: oneDayAgo })
        .execute();

      this.logger.log(`Cleaned up ${result.affected} old views.`);
    } catch (error) {
      this.logger.error('PostViewLog cleanup failed', error.stack);
    }
  }
}
