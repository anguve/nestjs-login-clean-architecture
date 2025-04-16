import { Inject, Injectable } from '@nestjs/common';

import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/IUserRepository';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/UnauthorizedDomainException';

import { UserDeletePort } from '../ports/userDeletePort';
import { VOUuid } from '@user-registration/domain/value-objects/VOUuid';

@Injectable()
export class UserDeleteUseCase implements UserDeletePort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: any): Promise<any> {
    const valueObjects = await this.buildValueObjects(data);

    await this.userRegisterDB(valueObjects);

    return {};
  }

  private async buildValueObjects(data: any) {
    return new VOUuid(data.id).value;
  }

  private async userRegisterDB(data: any) {
    const response = await this.userRepository.updateUser(data, {
      isActive: false
    });
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario'
      );
    }
  }
}
