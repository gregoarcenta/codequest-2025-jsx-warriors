import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from "@nestjs/swagger";
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { UserResponse } from '../../../auth/interfaces/user-response';

export const ApiCheckStatusResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'User has been successfully registered.',
      type: UserResponse,
    }),
    ApiErrorResponses({
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
