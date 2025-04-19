import { Inject, Injectable } from '@nestjs/common';

import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';

import { UserUpdatePort } from '../ports/user-update.port';
import { UserUpdateDto } from '../dto/user-update.dto';
import { UserUpdateAggregateRoot } from '../../domain/aggregates/user-update.aggregate-root';
import { UserUpdateResponse } from '../types/user-update-response';

@Injectable()
export class UserUpdateUseCase implements UserUpdatePort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: UserUpdateDto): Promise<UserUpdateResponse> {
    const userUpdateAggregateRoot = this.buildAggregateRoot(data);
    await this.updateUserDB(userUpdateAggregateRoot.toPrimitives());
    return {};
  }

  private buildAggregateRoot(data: UserUpdateDto): UserUpdateAggregateRoot {
    return new UserUpdateAggregateRoot(data);
  }

  private async updateUserDB(userPrimitives: UserUpdateDto) {
    const response = await this.userRepository.updateUser(userPrimitives);
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario'
      );
    }
    return response;
  }
}
