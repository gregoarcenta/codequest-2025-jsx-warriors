import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const ApiDiscordSignUpResponse = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Login with Discord' }),
    ApiResponse({
      status: 302,
      description: 'Redirect to Discord OAuth',
    }),
  );
};
