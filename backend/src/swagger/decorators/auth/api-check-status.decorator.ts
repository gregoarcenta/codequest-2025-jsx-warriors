import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { AuthResponse } from '../../../auth/interfaces/auth-response';

export const ApiCheckStatusResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get user by json web token' }),
    ApiOkResponse({
      description: 'User has been successfully registered.',
      type: AuthResponse,
    }),
    ApiErrorResponses({
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
