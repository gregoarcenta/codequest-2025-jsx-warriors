import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiPublishPostResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update status post to published' }),
    ApiOkResponse({
      description: 'Update status post to published successfully.',
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
