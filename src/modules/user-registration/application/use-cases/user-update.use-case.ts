import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import { UserUpdatePort } from '@user-registration/application/ports/user-update.port';
import { UserUpdateDto } from '@user-registration/application/dto/user-update.dto';
import { UserUpdateAggregateRoot } from '@user-registration/domain/aggregates/user-update.aggregate-root';
import { UserUpdateResponse } from '@user-registration/application/types/user-update-response';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';

@Injectable()
export class UserUpdateUseCase implements UserUpdatePort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    /* Empty constructor: dependencies are injected here.
     No additional logic is executed to keep single responsibility. */
  }

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
        'Algo salio mal en la creación del usuario',
        'Algo salio mal en la creación del usuario'
      );
    }
    return response;
  }
}
