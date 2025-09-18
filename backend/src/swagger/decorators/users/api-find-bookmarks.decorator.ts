import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiFindBookmarksResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get user bookmarks' }),
    ApiOkResponse({
      description: 'Get user bookmarks successfully.',
      example: {
        bookmarks: [
          {
            id: 'dbf2145f-79cc-4495-8e57-1d889e3f0661',
            post: {
              id: '7b4e3a05-020e-4fd9-9d18-8ccd8300ab17',
              title: 'Post title 4',
              slug: 'post-title-4',
              content: 'This is a post content',
              coverImageUrl: 'https://example.com/cover.jpg',
              status: 'published',
              isFeatured: false,
              viewsCount: 1,
              publishedAt: '2025-09-04T20:22:05.322Z',
              createdAt: '2025-09-13T19:28:20.662Z',
              updatedAt: '2025-09-17T22:34:21.165Z',
            },
          },
        ],
        total: 3,
        page: 1,
        limit: 10,
        pages: 1,
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
