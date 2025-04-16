import { BaseResponseDto } from '@common/shared/dto/base-response.dto';
import { BaseController } from '@common/shared/infrastructure/controller/BaseController';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserRegisterDto } from '@user-registration/application/dto/UserRegisterDto';
import {
  USER_DELETE_PORT,
  UserDeletePort
} from '@user-registration/application/ports/userDeletePort';
import {
  USER_GET_ALL_PORT,
  UserGetAllPort
} from '@user-registration/application/ports/userGetAllPort';
import {
  USER_GET_BY_ID_PORT,
  UserGetByIdPort
} from '@user-registration/application/ports/userGetByIdPort';
import {
  USER_REGISTER_PORT,
  UserRegisterPort
} from '@user-registration/application/ports/userRegisterPort';
import {
  USER_SEARCH_PORT,
  UserSearchPort
} from '@user-registration/application/ports/userSearchPort';
import {
  USER_UPDATE_PORT,
  UserUpdatePort
} from '@user-registration/application/ports/userUpdatePort';
import { UserRegisterResponse } from '@user-registration/application/types/UserRegisterResponse';

@Controller('api/users')
export class RegisterUsersController extends BaseController {
  constructor(
    @Inject(USER_REGISTER_PORT)
    private readonly userRegisterPort: UserRegisterPort,
    @Inject(USER_DELETE_PORT)
    private readonly userDeletePort: UserDeletePort,
    @Inject(USER_GET_ALL_PORT)
    private readonly userGetAllPort: UserGetAllPort,
    @Inject(USER_GET_BY_ID_PORT)
    private readonly userGetByIdPort: UserGetByIdPort,
    @Inject(USER_SEARCH_PORT)
    private readonly userSearchPort: UserSearchPort,
    @Inject(USER_UPDATE_PORT)
    private readonly userUpdatePort: UserUpdatePort
  ) {
    super();
  }

  @Get('get-all/v1')
  async getAll(): Promise<BaseResponseDto<UserRegisterResponse>> {
    const result = await this.userGetAllPort.execute();
    return this.createResponse(result, 'Usuarios Obtenidos correctamente');
  }

  @Post('get-by-id/v1')
  async getById(
    @Body() data: UserRegisterDto
  ): Promise<BaseResponseDto<UserRegisterResponse>> {
    const result = await this.userGetByIdPort.execute(data);
    return this.createResponse(result, 'Usuario Obtenido correctamente');
  }

  @Post('add/v1')
  async add(
    @Body() data: UserRegisterDto
  ): Promise<BaseResponseDto<UserRegisterResponse>> {
    const result = await this.userRegisterPort.execute(data);
    return this.createResponse(result, 'Registro de usuario exitoso');
  }

  @Post('change/v1')
  async update(
    @Body() data: any
  ): Promise<BaseResponseDto<UserRegisterResponse>> {
    const result = await this.userUpdatePort.execute(data.id, data.data);
    return this.createResponse(result, 'EL usuario se actualizo correctamente');
  }

  @Post('remove/v1')
  async delete(
    @Body() data: any
  ): Promise<BaseResponseDto<UserRegisterResponse>> {
    const result = await this.userDeletePort.execute(data);
    return this.createResponse(result, 'Se removió le usuario correctamente');
  }

  @Post('search/v1')
  async search(
    @Body() data: UserRegisterDto
  ): Promise<BaseResponseDto<UserRegisterResponse>> {
    const result = await this.userSearchPort.execute(data);
    return this.createResponse(result, 'Registro de usuario exitoso');
  }
}
