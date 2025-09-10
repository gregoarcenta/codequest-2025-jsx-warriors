import { applyDecorators } from '@nestjs/common';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UploadImageResponse } from '../../../upload/interfaces/upload-image.response';

export const ApiUploadImageResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Upload image to cloudinary.' }),
    ApiCreatedResponse({
      description: 'The image was successfully uploaded to the server.',
      type: UploadImageResponse,
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
    ApiResponse({
      status: 422,
      description: 'Unprocessable Entity',
      example: {
        statusCode: 422,
        message: 'Validation failed (expected size is less than 250000)',
        error: 'Unprocessable Entity',
      },
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      forbidden: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
