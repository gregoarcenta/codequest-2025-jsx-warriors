import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiRemoveResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Remove category' }),
    ApiOkResponse({
      description: 'Remove category successfully.',
      example: { message: `Category Frontend deleted successfully` },
    }),
    ApiErrorResponses({
      badRequest: true,
      unauthorized: true,
      forbidden: true,
      notFound: true,
      internalServerError: true,
    }),
  );
};
