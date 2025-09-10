import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { UserResponse } from '../../../auth/interfaces/user-response';

export const ApiSignUpResponse = () => {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'User has been successfully registered.',
      type: UserResponse,
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
