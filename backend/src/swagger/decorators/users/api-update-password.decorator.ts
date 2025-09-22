import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiUpdatePasswordResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update password user' }),
    ApiOkResponse({
      description: 'Password updated successfully.',
      example: {
        message: `User Alex password updated successfully`,
      },
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
