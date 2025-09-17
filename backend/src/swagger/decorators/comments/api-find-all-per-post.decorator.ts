import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiErrorResponses } from '../api-error-responses.decorator';

export const ApiFindAllPerPostResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Get all comments per post' }),
    ApiOkResponse({
      description: 'Get all comments per post successfully.',
      example: `
     {
  "comments": [
    {
      "id": "6edaf7fe-2b00-4a6b-9bc7-521fd826024c",
      "content": "This is a comment content 4",
      "isVisible": true,
      "createdAt": "2025-09-17T00:39:14.971Z",
      "updatedAt": "2025-09-17T00:49:04.712Z",
      "author": {
        "id": "669d7694-b5f5-4ad5-b4a1-494e44be96df",
        "discordId": null,
        "fullName": "Admin",
        "email": "admin@correo.com",
        "avatarUrl": null,
        "bio": null,
        "isActive": true,
        "roles": [
          "admin"
        ],
        "lastLoginAt": "2025-09-17T00:46:53.236Z",
        "createdAt": "2025-09-13T01:16:40.417Z",
        "updatedAt": "2025-09-14T05:45:43.860Z"
      },
      "children": [
        {
          "id": "ccfdae5b-b288-4a0a-bed1-68034712da7f",
          "content": "comentario hijo 1",
          "isVisible": true,
          "createdAt": "2025-09-17T00:45:55.538Z",
          "updatedAt": "2025-09-17T00:47:05.820Z",
          "author": {
            "id": "669d7694-b5f5-4ad5-b4a1-494e44be96df",
            "discordId": null,
            "fullName": "Admin",
            "email": "admin@correo.com",
            "avatarUrl": null,
            "bio": null,
            "isActive": true,
            "roles": [
              "admin"
            ],
            "lastLoginAt": "2025-09-17T00:46:53.236Z",
            "createdAt": "2025-09-13T01:16:40.417Z",
            "updatedAt": "2025-09-14T05:45:43.860Z"
          }
        },
        {
          "id": "76c73134-4624-45b0-85a8-42f235badd12",
          "content": "comentario hijo 2",
          "isVisible": true,
          "createdAt": "2025-09-17T00:45:50.458Z",
          "updatedAt": "2025-09-17T00:45:50.458Z",
          "author": {
            "id": "669d7694-b5f5-4ad5-b4a1-494e44be96df",
            "discordId": null,
            "fullName": "Admin",
            "email": "admin@correo.com",
            "avatarUrl": null,
            "bio": null,
            "isActive": true,
            "roles": [
              "admin"
            ],
            "lastLoginAt": "2025-09-17T00:46:53.236Z",
            "createdAt": "2025-09-13T01:16:40.417Z",
            "updatedAt": "2025-09-14T05:45:43.860Z"
          }
        }
      ]
    },
    {
      "id": "3e0a5c35-798e-49e4-9d26-25f6de870b84",
      "content": "This is a comment content 2",
      "isVisible": true,
      "createdAt": "2025-09-17T00:39:09.247Z",
      "updatedAt": "2025-09-17T00:39:09.247Z",
      "author": {
        "id": "669d7694-b5f5-4ad5-b4a1-494e44be96df",
        "discordId": null,
        "fullName": "Admin",
        "email": "admin@correo.com",
        "avatarUrl": null,
        "bio": null,
        "isActive": true,
        "roles": [
          "admin"
        ],
        "lastLoginAt": "2025-09-17T00:46:53.236Z",
        "createdAt": "2025-09-13T01:16:40.417Z",
        "updatedAt": "2025-09-14T05:45:43.860Z"
      },
      "children": []
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 10,
  "pages": 1
}`,
    }),
    ApiErrorResponses({
      badRequest: true,
      internalServerError: true,
    }),
  );
};
