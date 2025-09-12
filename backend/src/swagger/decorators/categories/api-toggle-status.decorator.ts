import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiToggleStatusResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update category status' }),
    ApiOkResponse({
      description: 'Update category status successfully.',
      example: {
        message: `Category Frontend activated successfully`,
      },
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
