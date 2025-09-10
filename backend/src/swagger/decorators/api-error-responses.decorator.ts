import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiErrorResponses = (options?: {
  badRequest?: boolean;
  notFound?: boolean;
  unauthorized?: boolean;
  forbidden?: boolean;
  internalServerError?: boolean;
}) => {
  return applyDecorators(
    options?.badRequest
      ? ApiBadRequestResponse({
          description:
            'The request data is invalid. Please check the input fields.',
          example: {
            error: 'Bad Request',
            statusCode: 400,
          },
        })
      : () => {},
    options?.notFound
      ? ApiNotFoundResponse({
          description: 'Resource not found. Verify the request parameters.',
          example: {
            error: 'Not Found',
            statusCode: 404,
          },
        })
      : () => {},
    options?.unauthorized
      ? ApiUnauthorizedResponse({
          description:
            'Unauthorized. Authentication is required to access this endpoint.',
          example: {
            message: 'Unauthorized',
            statusCode: 401,
          },
        })
      : () => {},
    options?.forbidden
      ? ApiForbiddenResponse({
          description:
            'Access denied. Insufficient permissions or invalid token.',
          example: {
            message: 'User Test 2 needs a valid role',
            error: 'Forbidden',
            statusCode: 403,
          },
        })
      : () => {},
    options?.internalServerError
      ? ApiInternalServerErrorResponse({
          description: 'Internal server error. Check logs for details.',
          example: {
            error: 'Internal server error',
            statusCode: 500,
          },
        })
      : () => {},
  );
};
