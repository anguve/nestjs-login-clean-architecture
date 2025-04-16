import { Inject, Injectable } from '@nestjs/common';

import { VOEmail } from '@user-registration/domain/value-objects/VOEmail';
import { VOName } from '@user-registration/domain/value-objects/VOName';
import { VOLastName } from '@user-registration/domain/value-objects/VOLastName';

import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/IUserRepository';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/UnauthorizedDomainException';

import { UserSearchPort } from '../ports/userSearchPort';

@Injectable()
export class UserSearchUseCase implements UserSearchPort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: any): Promise<any> {
    const valueObjects = await this.buildValueObjects(data);

    const response = await this.userRegisterDB(valueObjects);

    return {
      user: response
    };
  }

  private async buildValueObjects(data: any) {
    return {
      email: data.email ? new VOEmail(data.email).value : undefined,
      name: data.name ? new VOName(data.name).value : undefined,
      lastName: data.lastName ? new VOLastName(data.lastName).value : undefined
    };
  }

  private async userRegisterDB(data: any) {
    const response = await this.userRepository.searchUser(data);
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario'
      );
    }
    return response;
  }
}
