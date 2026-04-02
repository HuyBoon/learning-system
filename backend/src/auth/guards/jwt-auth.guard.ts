import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger('AuthGuard');

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.error(`Authentication Failure! Reason: ${info?.message || 'Access token missing or invalid'}`);
      if (err) this.logger.error(`Detailed Error: ${err.message}`);
      throw err || new UnauthorizedException(info?.message || 'Unauthorized access');
    }
    return user;
  }
}
