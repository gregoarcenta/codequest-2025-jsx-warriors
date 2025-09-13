import { User } from '../auth/entities/user.entity';
import { Role } from '../config';

export const userInitialData: Pick<
  User,
  'email' | 'fullName' | 'password' | 'roles'
>[] = [
  {
    email: 'admin@correo.com',
    fullName: 'Admin',
    password: 'Admin1',
    roles: [Role.ADMIN],
  },
];
