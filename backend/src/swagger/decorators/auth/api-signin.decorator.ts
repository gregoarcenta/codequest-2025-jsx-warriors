import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserResponse } from '../../../auth/interfaces/user-response';

export const ApiSignInResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'User has been successfully login.',
      type: UserResponse,
    }),
    ApiErrorResponses({
      badRequest: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
