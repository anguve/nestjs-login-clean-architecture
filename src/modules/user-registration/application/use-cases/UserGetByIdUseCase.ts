import { Inject, Injectable } from '@nestjs/common';

import { UserRegisterDto } from '../dto/UserRegisterDto';

import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/IUserRepository';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/UnauthorizedDomainException';

import { UserGetByIdPort } from '../ports/userGetByIdPort';
import { VOUuid } from '@user-registration/domain/value-objects/VOUuid';

@Injectable()
export class UserGetByIdUseCase implements UserGetByIdPort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: UserRegisterDto): Promise<any> {
    const valueObjects = await this.buildValueObjects(data);

    const response = await this.getUserByIdDB(valueObjects);

    return {
      user: response
    };
  }

  private async buildValueObjects(data: any) {
    return new VOUuid(data.id).value;
  }

  private async getUserByIdDB(data: any) {
    const response = await this.userRepository.getById(data);
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario'
      );
    }
    return response;
  }
}
