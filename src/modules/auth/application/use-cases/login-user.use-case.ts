import { Inject, Injectable } from '@nestjs/common';
import { NotFoundDomainException } from '@common/shared/domain/errors/not-found-domain.exception';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import {
  I_JWT_SERVICE_PORT,
  IJwtServicePort
} from '@common/shared/domain/ports/jwt-service.port';
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
  I_PASSWORD_HASHER_PORT,
  IPasswordHasherPort
} from '@common/shared/domain/ports/password-hasher.port';

@Injectable()
export class LoginUserUseCase implements LoginPort {
  constructor(
    @Inject(I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(I_JWT_SERVICE_PORT)
    private readonly jwtServicePort: IJwtServicePort,
    @Inject(I_PASSWORD_HASHER_PORT)
    private readonly passwordHasherPort: IPasswordHasherPort
  ) {}

  async execute(data: LoginUserDto): Promise<LoginResponse> {
    const loginAggregate = new UserLoginAggregateRoot(data);
    const user = await this.findUserByEmail(loginAggregate.getEmail());
    this.validateUser(user);
    this.ensurePasswordIsValid(
      loginAggregate.toPrimitives().password,
      user.password ?? ''
    );
    const token = await this.generateJwt(user);
    return { token: this.passwordHasherPort.to(token) };
  }

  private validateUser(user: LoginUserEntity): void {
    if (!user.isActive || user.isDeleted) {
      throw new NotFoundDomainException('Usuario no válido');
    }
  }

  private async findUserByEmail(email: string): Promise<LoginUserEntity> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundDomainException('Usuario no válido');
    }
    return user;
  }

  private ensurePasswordIsValid(
    inputPassword: string,
    storedPassword: string
  ): void {
    if (inputPassword !== storedPassword) {
      throw new UnauthorizedDomainException('Contraseña inválida');
    }
  }

  private async generateJwt(user: LoginUserEntity): Promise<string> {
    return this.jwtServicePort.sign({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email
    });
  }
}
