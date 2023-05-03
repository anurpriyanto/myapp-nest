import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MembersService } from '../members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private memberService: MembersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username : string, pass: string) {
    const member = await this.memberService.findByUsername(username);//this.usersService.findOne(username);
    const match = await bcrypt.compare(pass, member.password);
    // if (user?.password !== pass) {
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { username: member.username, sub: member.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1d',
      }),
    };
  }
}
