import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiFindAllResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get user bookmarks' }),
    ApiOkResponse({
      description: 'Get user bookmarks successfully.',
      example: {
        users: [
          {
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
          {
            id: '52e5fea3-b679-407d-96a2-5497c68f540b',
            discordId: null,
            fullName: 'Admin',
            email: 'admin@correo.com',
            avatarUrl: null,
            bio: null,
            isActive: true,
            roles: ['admin'],
            lastLoginAt: '2025-09-18T01:19:22.712Z',
            createdAt: '2025-09-16T00:43:01.137Z',
            updatedAt: '2025-09-16T00:43:01.137Z',
            likesCount: 0,
            postsCount: 1,
          },
        ],
        total: 2,
        page: 1,
        limit: 10,
        pages: 1,
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
