import { Inject, Injectable } from '@nestjs/common';

import { UnauthorizedDomainException } from '@common/shared/domain/errors/UnauthorizedDomainException';
import { UserSearchPort } from '@user-registration/application/ports/userSearchPort';
import { UserAggregateRoot } from '@user-registration/domain/aggregates/UserAggregateRoot';
import { UserSearchResponse } from '@user-registration/application/types/UserSearchResponse';
import { UserSearchDto } from '@user-registration/application/dto/UserSearchDto';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/IUserRepository';

@Injectable()
export class UserSearchUseCase implements UserSearchPort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: UserSearchDto): Promise<UserSearchResponse> {
    const userAggregateRoot = this.buildUserAggregateRoot(data);

    const response = await this.searchUserInDB(
      userAggregateRoot.toPrimitives()
    );
    return {
      users: response
    };
  }

  private buildUserAggregateRoot(data: UserSearchDto): UserAggregateRoot {
    return new UserAggregateRoot(data);
  }

  private async searchUserInDB(userPrimitives: UserSearchDto) {
    const response = await this.userRepository.searchUser({
      where: userPrimitives,
      select: [
        'id',
        'email',
        'name',
        'lastName',
        'isActive',
        'isDeleted',
        'createdAt',
        'updatedAt'
      ],
      order: { createdAt: 'DESC' }
    });

    if (!response?.length) {
      throw new UnauthorizedDomainException(
        'No se encontró ningún usuario con esos criterios'
      );
    }
    return response;
  }
}
