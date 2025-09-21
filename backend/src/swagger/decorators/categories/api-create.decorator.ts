import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { Category } from '../../../categories/entities/category.entity';

export const ApiCreateResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Create new category' }),
    ApiOkResponse({
      description: 'Category has been successfully created.',
      type: Category,
    }),
    ApiErrorResponses({
      badRequest: true,
      forbidden: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
