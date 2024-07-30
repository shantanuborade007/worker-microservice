import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
console.log('here im in stratergy !');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromExtractors([
          (request) => {
            return request?.cookies?.jwt;
          },
        ]) || ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,
      secretOrKey: 'shantanu',
    });
  }

  async validate(payload: any) {
    console.log('im here in validate function !');
    console.log(payload)
    // { where: { email } }
    const option = payload.sub;
    const user = await this.usersRepository.findOne({where:{id:payload.sub}});
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
