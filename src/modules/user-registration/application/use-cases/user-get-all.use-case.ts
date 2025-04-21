import { Inject, Injectable } from '@nestjs/common';

import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';

import { UserGetAllPort } from '@user-registration/application/ports/user-get-all.port';

@Injectable()
export class UserGetAllUseCase implements UserGetAllPort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(): Promise<any> {
    const response = await this.getAllUserDB();
    return {
      users: response
    };
  }

  private async getAllUserDB() {
    const response = await this.userRepository.getAll();
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario',
        'Algo salio mal en la creación del usuario2'
      );
    }
    return response;
  }
}
