import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiFindAllResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all posts' }),
    ApiOkResponse({
      description: 'Get all posts successfully',
      type: [PostResponse],
    }),
    ApiErrorResponses({
      badRequest: true,
      forbidden: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
