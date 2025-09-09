import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../../config';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    Roles(roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
};
