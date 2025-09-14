import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiCreateResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create new post' }),
    ApiCreatedResponse({
      description: 'Post has been successfully created.',
      type: PostResponse,
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      forbidden: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
