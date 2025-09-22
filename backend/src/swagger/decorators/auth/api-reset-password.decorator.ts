import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiResetPasswordResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Reset user password' }),
    ApiOkResponse({
      description: 'Password has been reset successfully.',
      example: {
        statusCode: 200,
        message: 'La contraseña se ha restablecido correctamente.',
      },
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
