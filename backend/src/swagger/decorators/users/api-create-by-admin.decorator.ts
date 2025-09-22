import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { AuthResponse } from '../../../auth/interfaces';

export const ApiCreateByAdminResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Create new user' }),
    ApiOkResponse({
      description: 'User has been created successfully.',
      type: AuthResponse,
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
