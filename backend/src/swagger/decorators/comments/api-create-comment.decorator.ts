import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiCreateCommentResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Create new comment' }),
    ApiCreatedResponse({
      description: 'Comment has been successfully created.',
      example: `
      {
  "content": "This is a comment content",
  "post": {
    "id": "f55863ff-0ba8-497d-ac0a-3278631d66d7"
  },
  "author": {
    "id": "669d7694-b5f5-4ad5-b4a1-494e44be96df"
  },
  "parent": null,
  "id": "fd7c7ea8-4c19-4ed4-afb4-fc7a556773ae",
  "isVisible": true,
  "createdAt": "2025-09-17T01:27:36.891Z",
  "updatedAt": "2025-09-17T01:27:36.891Z"
}
      `,
    }),
    ApiErrorResponses({
      badRequest: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
