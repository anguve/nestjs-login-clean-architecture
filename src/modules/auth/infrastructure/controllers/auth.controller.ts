import { Response } from 'express';
import { Controller, Post, Inject, Body, Res } from '@nestjs/common';
import { BaseController } from '@common/shared/infrastructure/controller/base.controller';
import { BaseResponseDto } from '@common/shared/dto/base-response.dto';
import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';
import { LoginUserDto } from '@auth/application/dto/login-user.dto';
import { LOGIN_PORT, LoginPort } from '@auth/application/ports/login.port';
import { LoginResponse } from '@auth/application/types/login-response';
import { LOGIN_SUCCESS_MESSAGE } from '@auth/infrastructure/constants/messages.constants';

@Controller('api/auth')
export class AuthController extends BaseController {
  constructor(@Inject(LOGIN_PORT) private readonly loginPort: LoginPort) {
    super();
  }

  @Post('login/v1')
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<BaseResponseDto<LoginResponse>> {
    const { token } = await this.loginPort.execute(data);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: validatedEnvVars.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    });

    return this.createResponse({}, LOGIN_SUCCESS_MESSAGE);
  }
}
