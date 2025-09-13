import {
  Injectable,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class HandlerException {
  private logger = new Logger(HandlerException.name);

  handlerDBException(error: any): never {
    if (error.code === '23502') {
      const message = `The column (${error.column}) cannot be null`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    if (error.code === '23503') {
      const message = `Invalid reference: related record not found.`;
      this.logger.error(message);
      throw new BadRequestException(message);
    }

    if (error.code === '23505') {
      const message = `The value you tried to insert already exists.`;
      this.logger.error(message);
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error.message);
    throw new InternalServerErrorException('Unexpected error - check logs');
  }
}
