import { SetMetadata } from '@nestjs/common';
import { Role, ROLES_KEY } from '../../config';


export const Roles = (roles: Role[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
