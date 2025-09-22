import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiForgotPasswordResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'User forgot password' }),
    ApiOkResponse({
      description: 'Email has been sent to user.',
      example: {
        statusCode: 200,
        message:
          'El enlace para restablecer tu contraseña se ha enviado exitosamente a tu correo electrónico.',
      },
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
