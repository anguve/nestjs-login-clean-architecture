import { Controller, Post, Inject, Body } from '@nestjs/common';
import { LoginUserDto } from '@auth/application/dto/login-user.dto';
import { LOGIN_PORT, LoginPort } from '@auth/application/ports/login.port';
import { LoginResponse } from '@auth/application/types/login-response';
import { BaseController } from '@common/shared/infrastructure/controller/base.controller';
import { BaseResponseDto } from '@common/shared/dto/base-response.dto';

@Controller('api/auth')
export class AuthController extends BaseController {
  constructor(@Inject(LOGIN_PORT) private readonly loginPort: LoginPort) {
    super();
  }

  @Post('login/v1')
  async login(
    @Body() data: LoginUserDto
  ): Promise<BaseResponseDto<LoginResponse>> {
    const result = await this.loginPort.execute(data);
    return this.createResponse(result, 'Login exitoso');
  }
}
