import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from './repositories/user.repository';
import { PrismaModule } from '../prisma/prisma.module';

import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'supersecret',
        signOptions: { 
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') || '1d') as any
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserRepository],
  exports: [AuthService, UserRepository]
})
export class AuthModule {}
