import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    // Si hay un error de autenticación, manejarlo directamente
    if (err) this.handleError(err);

    // Si no hay usuario, manejar los mensajes específicos según el error
    if (!user) this.handleInfoMessage(info);

    return user; // Si tod@ es válido, retornamos el usuario y continuamos
  }

  private handleError(err: any): void {
    if (err instanceof UnauthorizedException) {
      throw err; // Lanza la excepción directamente si ya es UnauthorizedException
    }
    throw new UnauthorizedException('Unauthorized access'); // Cualquier otro error
  }

  private handleInfoMessage(info: any): void {
    if (!info) throw new UnauthorizedException('Unauthorized access'); // Mensaje por defecto si no hay información adicional

    // Usamos un switch para mejorar la legibilidad del manejo de mensajes
    switch (info.message) {
      case 'No auth token':
        throw new UnauthorizedException('Token not provided');
      case 'invalid signature':
        throw new UnauthorizedException('Invalid token signature');
      case 'jwt expired':
        throw new UnauthorizedException('Token expired');
      default:
        throw new UnauthorizedException('Unauthorized access');
    }
  }
}
