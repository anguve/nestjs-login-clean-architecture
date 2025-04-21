import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import { UserSearchPort } from '@user-registration/application/ports/user-search.port';
import { UserSearchResponse } from '@user-registration/application/types/user-search-response';
import { UserSearchDto } from '@user-registration/application/dto/user-search.dto';
import { UserSearchAggregateRoot } from '@user-registration/domain/aggregates/user-search.aggregate-root';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';

@Injectable()
export class UserSearchUseCase implements UserSearchPort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: UserSearchDto): Promise<UserSearchResponse> {
    const userSearchAggregateRoot = this.buildAggregateRoot(data);
    const response = await this.searchUserInDB(
      userSearchAggregateRoot.toPrimitives()
    );
    return {
      users: response
    };
  }

  private buildAggregateRoot(data: UserSearchDto): UserSearchAggregateRoot {
    return new UserSearchAggregateRoot(data);
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
        'No se encontró ningún usuario con esos criterios',
        'No se encontró ningún usuario con esos criterios'
      );
    }
    return response;
  }
}
