import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiFindAllPublishedResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all published posts' }),
    ApiOkResponse({
      description: 'Get all published posts successfully',
      type: [PostResponse],
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
