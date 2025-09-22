import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiToggleBookmarkResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Toggle bookmark' }),
    ApiOkResponse({
      description: 'Toggle bookmark successfully.',
      example: { message: 'Bookmark updated successfully' },
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
