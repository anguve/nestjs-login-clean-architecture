import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/UnauthorizedDomainException';
import { UserDeletePort } from '@user-registration/application/ports/userDeletePort';
import { UserDeleteResponse } from '@user-registration/application/types/UserDeleteResponse';
import { UserDeleteDto } from '@user-registration/application/dto/UserDeleteDto';
import { UserAggregateRoot } from '@user-registration/domain/aggregates/UserAggregateRoot';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/IUserRepository';

@Injectable()
export class UserDeleteUseCase implements UserDeletePort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: UserDeleteDto): Promise<UserDeleteResponse> {
    const userAggregateRoot = await this.buildValueObjects(data);

    await this.userRegisterDB(userAggregateRoot.toPrimitives().id as string);

    return {};
  }

  private async buildValueObjects(data: UserDeleteDto) {
    return new UserAggregateRoot(data);
  }

  private async userRegisterDB(userPrimitives: string) {
    const response = await this.userRepository.updateUser(userPrimitives, {
      isActive: false
    });
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario'
      );
    }
  }
}
