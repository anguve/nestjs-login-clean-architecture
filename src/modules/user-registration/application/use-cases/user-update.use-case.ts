import { Inject, Injectable } from '@nestjs/common';

import { VOEmail } from '@user-registration/domain/value-objects/vo-email';
import { VOName } from '@user-registration/domain/value-objects/vo-name';
import { VOLastName } from '@user-registration/domain/value-objects/vo-last-name';

import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';

import { UserUpdatePort } from '../ports/user-update.port';

@Injectable()
export class UserUpdateUseCase implements UserUpdatePort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string, data: any): Promise<any> {
    const valueObjects = await this.buildValueObjects(data);

    await this.updateUserDB(id, valueObjects);

    return {};
  }

  private async buildValueObjects(data: any) {
    return {
      email: new VOEmail(data.email).value,
      name: new VOName(data.name).value,
      lastName: new VOLastName(data.lastName).value
    };
  }

  private async updateUserDB(id: string, data: any) {
    const response = await this.userRepository.updateUser(id, data);
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario'
      );
    }
  }
}
