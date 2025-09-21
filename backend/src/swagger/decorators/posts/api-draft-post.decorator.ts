import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PostResponse } from '../../../posts/interfaces/post.response';

export const ApiDraftPostResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Update status post to draft' }),
    ApiOkResponse({
      description: 'Update status post to draft successfully.',
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
