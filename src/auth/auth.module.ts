import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:'very_strong_secret_key',
      signOptions: { expiresIn: '1h' } // Token expiration time
    })
  ],
  controllers: [AuthController],
  providers: [JwtStrategy,AuthService]
})
export class AuthModule {}
