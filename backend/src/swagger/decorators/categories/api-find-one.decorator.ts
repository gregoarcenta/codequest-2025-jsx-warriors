import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Category } from '../../../categories/entities/category.entity';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiFindOneResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get one category' }),
    ApiOkResponse({
      description: 'Get one category successfully.',
      type: Category,
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
