import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import { UserDeletePort } from '@user-registration/application/ports/user-delete.port';
import { UserDeleteResponse } from '@user-registration/application/types/user-delete-response';
import { UserDeleteDto } from '@user-registration/application/dto/user-delete.dto';
import { UserAggregateRoot } from '@user-registration/domain/aggregates/base-user.aggregate-root';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';

@Injectable()
export class UserDeleteUseCase implements UserDeletePort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    /* Empty constructor: dependencies are injected here.
     No additional logic is executed to keep single responsibility. */
  }

  async execute(data: UserDeleteDto): Promise<UserDeleteResponse> {
    const userAggregateRoot = this.buildAggregateRoot(data);
    await this.userRegisterDB(userAggregateRoot.toPrimitives().id as string);
    return {};
  }

  private buildAggregateRoot(data: UserDeleteDto): UserAggregateRoot {
    return new UserAggregateRoot(data);
  }

  private async userRegisterDB(userPrimitives: string) {
    const response = await this.userRepository.deleteUser(userPrimitives, {
      isActive: false
    });
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario',
        'Algo salio mal en la creación del usuario2'
      );
    }
  }
}
