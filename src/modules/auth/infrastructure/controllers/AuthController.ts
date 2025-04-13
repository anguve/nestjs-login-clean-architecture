import { Controller, Post, Inject, Body } from '@nestjs/common';

import { LoginUserDto } from '@auth/application/dto/LoginUserDto';
import { LOGIN_PORT, LoginPort } from '@auth/application/ports/login.port';
import { LoginResponse } from '@auth/application/types/LoginResponse';

@Controller('api/auth')
export class AuthController {
  constructor(@Inject(LOGIN_PORT) private readonly loginPort: LoginPort) {}

  @Post('login/v1')
  login(@Body() data: LoginUserDto): Promise<LoginResponse> {
    return this.loginPort.execute(data);
  }

  @Post('logout/v1')
  logout() {}
}
