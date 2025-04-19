import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import { UserRegisterPort } from '@user-registration/application/ports/user-register.port';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterResponse } from '@user-registration/application/types/user-register-response';
import { UserRegisterAggregateRoot } from '@user-registration/domain/aggregates/user-register.aggregate-root';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';

@Injectable()
export class UserRegisterUseCase implements UserRegisterPort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {}

  async execute(data: UserRegisterDto): Promise<UserRegisterResponse> {
    const userRegisterAggregateRoot = this.buildAggregateRoot(data);
    await this.userRegisterDB(userRegisterAggregateRoot.toPrimitives());
    return {};
  }

  private buildAggregateRoot(data: UserRegisterDto): UserRegisterAggregateRoot {
    return new UserRegisterAggregateRoot(data);
  }

  private async userRegisterDB(data: UserRegisterDto) {
    const response = await this.userRepository.save(data);
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario'
      );
    }
  }
}
