import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiUpdateByAdminResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Update user' }),
    ApiOkResponse({
      description: 'Update user successfully.',
      example: { message: `User Alex updated successfully` },
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
