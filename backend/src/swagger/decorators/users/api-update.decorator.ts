import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiUpdateResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update user' }),
    ApiOkResponse({
      description: 'Update user successfully.',
      example: {
        id: 'a4426a88-4b04-45f0-86c4-f62bb2e2bdd1',
        discordId: null,
        fullName: 'user full name',
        email: 'test@test.com',
        avatarUrl: null,
        bio: null,
        isActive: true,
        roles: ['user'],
        lastLoginAt: '2025-09-18T00:03:23.520Z',
        createdAt: '2025-09-18T00:03:18.422Z',
        updatedAt: '2025-09-18T00:03:18.422Z',
        likesCount: 0,
        postsCount: 0,
      },
    }),
    ApiErrorResponses({
      badRequest: true,
      notFound: true,
      unauthorized: true,
      internalServerError: true,
    }),
  );
};
