import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiFindAllFeaturedResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all featured posts' }),
    ApiOkResponse({
      description: 'Get all featured posts successfully',
      type: [PostResponse],
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
