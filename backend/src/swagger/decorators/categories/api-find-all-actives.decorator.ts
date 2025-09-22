import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Category } from '../../../categories/entities/category.entity';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiFindAllActivesResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all actives categories' }),
    ApiOkResponse({
      description: 'Get all actives categories successfully.',
      type: [Category],
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      forbidden: true,
      internalServerError: true,
    }),
  );
};
