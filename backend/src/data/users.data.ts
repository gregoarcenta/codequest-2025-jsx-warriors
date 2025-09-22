import { User } from '../users/entities/user.entity';
import { Role } from '../config';
import * as bcrypt from 'bcrypt';

export const USERS_DATA: Partial<User>[] = [
  {
    id: '8f05462d-85ce-435c-ac49-7de04b87e0ea',
    fullName: 'Admin User',
    email: 'admin@correo.com',
    password: bcrypt.hashSync('Pass123', 10),
    bio: 'Soy el administrador del sitio. Me encargo de la gestión y mantenimiento.',
    roles: [Role.ADMIN],
  },
  {
    id: '9bd4f59c-3e6c-4742-9905-4501b526f34f',
    fullName: 'Normal User',
    email: 'user@correo.com',
    password: bcrypt.hashSync('Pass123', 10),
    bio: 'Soy un usuario normal que me gusta leer y comentar en los posts.',
    roles: [Role.USER],
  },
];
