import { Inject, Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import {
  I_PASSWORD_HASHER_PORT,
  IPasswordHasherPort
} from '@common/shared/domain/ports/password-hasher.port';
import { UserRegisterPort } from '@user-registration/application/ports/user-register.port';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { VOEmail } from '@user-registration/domain/value-objects/vo-email';
import { VOName } from '@user-registration/domain/value-objects/vo-name';
import { VOLastName } from '@user-registration/domain/value-objects/vo-last-name';
import { VOPassword } from '@auth/domain/value-objects/vo-password';
import { UserRegisterResponse } from '@user-registration/application/types/user-register-response';
import {
  I_USER_REGISTER_REPOSITORY,
  IUserRepository
} from '@user-registration/domain/repositories/user-repository.interface';

@Injectable()
export class UserRegisterUseCase implements UserRegisterPort {
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(I_PASSWORD_HASHER_PORT)
    private readonly passwordHasherPort: IPasswordHasherPort
  ) {}

  async execute(data: UserRegisterDto): Promise<UserRegisterResponse> {
    const valueObjects = await this.buildValueObjects(data);

    const response = await this.userRegisterDB(valueObjects);

    return {
      message: response
    };
  }

  private async buildValueObjects(data: UserRegisterDto) {
    return {
      email: new VOEmail(data.email).value,
      name: new VOName(data.name).value,
      lastName: new VOLastName(data.lastName).value,
      password: await this.passwordHasherPort.hash(
        new VOPassword(data.password).value
      )
    };
  }

  private async userRegisterDB(data: UserRegisterDto) {
    const response = await this.userRepository.save(data);
    if (!response) {
      throw new UnauthorizedDomainException(
        'Algo salio mal en la creación del usuario'
      );
    }
    return 'EL usuario se registro correctamente';
  }
}
