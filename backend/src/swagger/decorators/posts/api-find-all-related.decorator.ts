import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiFindAllRelatedResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all related posts' }),
    ApiOkResponse({
      description: 'Get all related posts successfully',
      type: [PostResponse],
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
