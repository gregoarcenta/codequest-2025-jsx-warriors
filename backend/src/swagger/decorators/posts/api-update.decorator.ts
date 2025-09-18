import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiUpdateResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update post' }),
    ApiOkResponse({
      description: 'Update post successfully.',
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
