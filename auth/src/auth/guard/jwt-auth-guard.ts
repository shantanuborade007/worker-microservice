/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
// import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.jwt;
    console.log(token)
    if (!token) {
        console.log("here error")
      throw new UnauthorizedException('User not logged in, please login to access this API');
    }
    
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log("im returning the use :)")
    if (err || !user) {
      throw err || new UnauthorizedException('User not logged in, please login to access this API');
    }
    return user;
  }
}
