import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login/v1')
  login() {}

  @Post('loggout/v1')
  loggout() {}
}
