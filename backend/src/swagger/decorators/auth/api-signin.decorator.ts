import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthResponse } from '../../../auth/interfaces/auth-response';

export const ApiSignInResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'User Login' }),
    ApiOkResponse({
      description: 'User has been successfully login.',
      type: AuthResponse,
    }),
    ApiErrorResponses({
      badRequest: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
