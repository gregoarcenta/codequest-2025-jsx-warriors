import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export const ApiToggleLikeResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Toggle like' }),
    ApiNoContentResponse({
      description: 'Toggle like successfully.',
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
