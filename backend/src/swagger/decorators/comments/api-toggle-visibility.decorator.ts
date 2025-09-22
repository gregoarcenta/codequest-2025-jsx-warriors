import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiToggleVisibilityResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Toggle visibility comment' }),
    ApiOkResponse({
      description: 'Toggle visibility comment successfully.',
      example: `{
          "message": "Comment visible successfully"
      }`,
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
