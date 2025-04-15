import { BaseResponseDto } from '@common/shared/dto/base-response.dto';
import { BaseController } from '@common/shared/infrastructure/controller/BaseController';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserRegisterDto } from '@user-registration/application/dto/UserRegisterDto';
import {
  USER_REGISTER_PORT,
  UserRegisterPort
} from '@user-registration/application/ports/userRegisterPort';
import { UserRegisterResponse } from '@user-registration/application/types/UserRegisterResponse';

@Controller('api/users')
export class RegisterUsersController extends BaseController {
  constructor(
    @Inject(USER_REGISTER_PORT)
    private readonly userRegisterPort: UserRegisterPort
  ) {
    super();
  }

  @Post('register/v1')
  async register(
    @Body() data: UserRegisterDto
  ): Promise<BaseResponseDto<UserRegisterResponse>> {
    const result = await this.userRegisterPort.execute(data);
    return this.createResponse(result, 'Registro de usuario exitoso');
  }
}
