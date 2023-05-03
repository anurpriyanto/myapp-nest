import { AppService } from '../services/app.service';
import { Controller,Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
// @Controller()
// export class AppController {
//   @UseGuards(AuthGuard('local'))
//   @Post('auth/login')
//   async login(@Request() req) {
//     return req.user;
//   }
// }
