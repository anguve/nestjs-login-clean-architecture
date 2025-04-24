import { Inject, Injectable } from '@nestjs/common';
import {
  I_PASSWORD_HASHER_PORT,
  IPasswordHasherPort
} from '@common/shared/domain/ports/password-hasher.port';
import {
  I_TOKEN_GENERATOR_PORT,
  ITokenGeneratorPort
} from '@common/shared/domain/ports/token-generator.port';
import { LoginPort } from '@auth/application/ports/login.port';
import { LoginUserDto } from '@auth/application/dto/login-user.dto';
import { LoginResponse } from '@auth/application/types/login-response';
import { UserLoginAggregateRoot } from '@auth/domain/aggregates/user-login.aggregate-root';
import { LoginUserEntity } from '@auth/domain/entities/login-user.entity';
import {
  I_USER_REPOSITORY,
  IUserRepository
} from '@auth/domain/repositories/user-repository.interface';
import {
  I_PASSWORD_VERIFIER_PORT,
  IPasswordVerifierPort
} from '@auth/domain/port/password-verifier.port';
import { INVALID_CREDENTIALS_MESSAGE } from '@common/shared/constants/messages';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';

@Injectable()
export class LoginUserUseCase implements LoginPort {
  constructor(
    @Inject(I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(I_PASSWORD_HASHER_PORT)
    private readonly passwordHasherPort: IPasswordHasherPort,
    @Inject(I_PASSWORD_VERIFIER_PORT)
    private readonly passwordVerifierPort: IPasswordVerifierPort,
    @Inject(I_TOKEN_GENERATOR_PORT)
    private readonly tokenGeneratorPort: ITokenGeneratorPort
  ) {}

  async execute(data: LoginUserDto): Promise<LoginResponse> {
    const agg = new UserLoginAggregateRoot(data);
    const user = await this.findUserByEmail(agg.getEmail());
    user.canLogin();
    await this.passwordVerifierPort.verify(
      agg.getPassword(),
      user.password ?? ''
    );
    const token = await this.tokenGeneratorPort.generate(user.id ?? '');

    return { token: this.passwordHasherPort.to(token) };
  }

  private async findUserByEmail(email: string): Promise<LoginUserEntity> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedDomainException(
        INVALID_CREDENTIALS_MESSAGE,
        INVALID_CREDENTIALS_MESSAGE
      );
    }
    return user;
  }
}
