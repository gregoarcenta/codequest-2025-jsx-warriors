import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiFindOneResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Get one post' }),
    ApiOkResponse({
      description: 'Get one post successfully.',
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
