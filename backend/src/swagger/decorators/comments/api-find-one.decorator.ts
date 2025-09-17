import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { Comment } from '../../../posts/entities/comment.entity';

export const ApiFindOneResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get one comment' }),
    ApiOkResponse({
      description: 'Get one comment successfully.',
      type: [Comment],
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
