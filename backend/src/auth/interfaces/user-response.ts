import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'UserResponse User', type: User })
  user: User;

  @ApiProperty({
    description: 'UserResponse accessToken',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBhOTkyNjdiLWZmOWItNDRlOS05OTRmLTNlZGRmZTljZTk3NSIsImlhdCI',
  })
  accessToken: string;
}
