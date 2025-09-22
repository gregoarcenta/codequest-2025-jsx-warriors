import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export const ApiToggleCommentLikeResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Toggle comment like' }),
    ApiNoContentResponse({
      description: 'Toggle post like successfully.',
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
