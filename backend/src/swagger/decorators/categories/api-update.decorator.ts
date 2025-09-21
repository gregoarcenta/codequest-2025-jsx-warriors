import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiUpdateResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Update category' }),
    ApiOkResponse({
      description: 'Update category successfully.',
      example: {
        message: `Category Frontend updated successfully`,
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
