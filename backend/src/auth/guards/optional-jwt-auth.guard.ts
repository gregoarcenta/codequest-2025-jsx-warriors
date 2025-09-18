import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    // console.log({ err, user, info });
    if (err) this.handleError(err);

    if (info) this.handleInfoMessage(info);

    if (!user) return null;

    return user;
  }

  private handleError(err: any): void {
    if (err instanceof UnauthorizedException) {
      throw err;
    }
    throw new UnauthorizedException('Unauthorized access');
  }

  private handleInfoMessage(info: any): void {
    if (!info) {
      return;
    }

    switch (info.message) {
      case 'No auth token':
        break;
      case 'invalid signature':
        throw new UnauthorizedException('Invalid token signature');
      case 'jwt expired':
        throw new UnauthorizedException('Token expired');
      default:
        throw new UnauthorizedException('Unauthorized access');
    }
  }
}
