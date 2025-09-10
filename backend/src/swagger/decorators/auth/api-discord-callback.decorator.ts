import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiDiscordCallbackResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Discord OAuth callback' }),
    ApiResponse({
      status: 302,
      description: 'Redirect to frontend with JWT',
    }),
  );
};
