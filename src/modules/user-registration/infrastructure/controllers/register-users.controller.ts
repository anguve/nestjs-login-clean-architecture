import { BaseResponseDto } from '@common/shared/dto/base-response.dto';
import { BaseController } from '@common/shared/infrastructure/controller/base.controller';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserDeleteDto } from '@user-registration/application/dto/user-delete.dto';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserSearchDto } from '@user-registration/application/dto/user-search.dto';
import {
  USER_DELETE_PORT,
  UserDeletePort
} from '@user-registration/application/ports/user-delete.port';
import {
  USER_GET_ALL_PORT,
  UserGetAllPort
} from '@user-registration/application/ports/user-get-all.port';
import {
  USER_GET_BY_ID_PORT,
  UserGetByIdPort
} from '@user-registration/application/ports/user-get-by-id.port';
import {
  USER_REGISTER_PORT,
  UserRegisterPort
} from '@user-registration/application/ports/user-register.port';
import {
  USER_SEARCH_PORT,
  UserSearchPort
} from '@user-registration/application/ports/user-search.port';
import {
  USER_UPDATE_PORT,
  UserUpdatePort
} from '@user-registration/application/ports/user-update.port';
import { UserDeleteResponse } from '@user-registration/application/types/user-delete-response';
import { UserRegisterResponse } from '@user-registration/application/types/user-register-response';
import { UserSearchResponse } from '@user-registration/application/types/user-search-response';
import { UserUpdateDto } from '../../application/dto/user-update.dto';
import { UserUpdateResponse } from '../../application/types/user-update-response';

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
    @Body() data: UserUpdateDto
  ): Promise<BaseResponseDto<UserUpdateResponse>> {
    const result = await this.userUpdatePort.execute(data);
    return this.createResponse(result, 'EL usuario se actualizo correctamente');
  }

  @Post('remove/v1')
  async delete(
    @Body() data: UserDeleteDto
  ): Promise<BaseResponseDto<UserDeleteResponse>> {
    const result = await this.userDeletePort.execute(data);
    return this.createResponse(result, 'Se removió le usuario correctamente');
  }

  @Post('search/v1')
  async search(
    @Body() data: UserSearchDto
  ): Promise<BaseResponseDto<UserSearchResponse>> {
    const result = await this.userSearchPort.execute(data);
    return this.createResponse(result, 'Registro de usuario exitoso');
  }
}
