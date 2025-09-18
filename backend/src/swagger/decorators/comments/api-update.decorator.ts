import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiUpdateResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update comment' }),
    ApiOkResponse({
      description: 'Update comment successfully.',
      example: `{
          "message": "Comment updated successfully"
      }`,
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
