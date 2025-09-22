import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';
import { Category } from '../../../categories/entities/category.entity';

export const ApiFindAllResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: '(Admin) Get all categories' }),
    ApiOkResponse({
      description: 'Get all categories successfully.',
      type: [Category],
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
