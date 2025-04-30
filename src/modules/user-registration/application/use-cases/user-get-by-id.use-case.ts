import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import { UserGetByIdResponse } from '@user-registration/application/types/user-get-by-id-response';
import { UserGetByIdDto } from '@user-registration/application/dto/user-get-by-id.dto';
import { UserGetByIdPort } from '@user-registration/application/ports/user-get-by-id.port';
import { UserGetByIdAggregateRoot } from '@user-registration/domain/aggregates/user-get-by-id.aggregate-root';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';

@Injectable()
export class UserGetByIdUseCase implements UserGetByIdPort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    /* Empty constructor: dependencies are injected here.
     No additional logic is executed to keep single responsibility. */
  }

  async execute(data: UserGetByIdDto): Promise<UserGetByIdResponse> {
    const userGetByIdAggregateRoot = this.buildAggregateRoot(data);
    const response = await this.getUserByIdDB(
      userGetByIdAggregateRoot.toPrimitives()
    );
    return {
      users: response
    };
  }

  private buildAggregateRoot(data: UserGetByIdDto): UserGetByIdAggregateRoot {
    return new UserGetByIdAggregateRoot(data);
  }

  private async getUserByIdDB(userPrimitives: string) {
    const response = await this.userRepository.getById(userPrimitives);
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario',
        'Algo salio mal en la creación del usuario2'
      );
    }
    return response;
  }
}
