import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiFindOnePublishedResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get one published post' }),
    ApiOkResponse({
      description: 'Get one published post successfully.',
      type: PostResponse,
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      internalServerError: true,
    }),
  );
};
