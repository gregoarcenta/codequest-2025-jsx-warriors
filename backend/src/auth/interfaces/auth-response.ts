import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class AuthResponse {
  @ApiProperty({ description: 'UserResponse User', type: User })
  user: User;

  @ApiProperty({
    description: 'UserResponse accessToken',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBhOTkyNjdiLWZmOWItNDRlOS05OTRmLTNlZGRmZTljZTk3NSIsImlhdCI',
  })
  accessToken: string;
}
