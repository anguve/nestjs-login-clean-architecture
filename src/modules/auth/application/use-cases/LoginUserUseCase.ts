import { Inject, Injectable } from '@nestjs/common';
import { LoginPort } from '@auth/application/ports/login.port';
import { LoginUserDto } from '@auth/application/dto/LoginUserDto';
import { LoginResponse } from '@auth/application/types/LoginResponse';
import { VOEmail } from '@auth/domain/value-objects/VOEmail';
import { VOPassword } from '@auth/domain/value-objects/VOPassword';
import {
  I_USER_REPOSITORY,
  IUserRepository
} from '@auth/domain/repositories/IUserRepository';
import {
  I_PASSWORD_HASHER_PORT,
  IPasswordHasherPort
} from '@common/shared/domain/ports/IPasswordHasherPort';
import {
  I_JWT_SERVICE_PORT,
  IJwtServicePort
} from '@common/shared/domain/ports/IJwtServicePort';
import { UserEntity } from '@auth/domain/entities/UserEntity';
import { NotFoundDomainException } from '@common/shared/domain/errors/NotFoundDomainException';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/UnauthorizedDomainException';

@Injectable()
export class LoginUserUseCase implements LoginPort {
  constructor(
    @Inject(I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(I_PASSWORD_HASHER_PORT)
    private readonly passwordHasherPort: IPasswordHasherPort,
    @Inject(I_JWT_SERVICE_PORT)
    private readonly jwtServicePort: IJwtServicePort
  ) {}

  async execute(data: LoginUserDto): Promise<LoginResponse> {
    const email = new VOEmail(data.email);
    const password = new VOPassword(data.password);
    const user = await this.validateUser(email);
    await this.validatePassword(password, user.password);
    const jwt = await this.buildJwt(user);

    return this.buildSuccessResponse(jwt);
  }

  private async buildJwt(user: UserEntity) {
    return this.jwtServicePort.sign({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      id: user.id
    });
  }

  private async validateUser(email: VOEmail) {
    const user = await this.userRepository.findByEmail(email.value);
    if (!user) {
      throw new NotFoundDomainException('Usuario no válido');
    }
    return user;
  }

  private async validatePassword(password: VOPassword, hashedPassword: string) {
    const isValid = await this.passwordHasherPort.compare(
      password.value,
      hashedPassword
    );
    if (!isValid) {
      throw new UnauthorizedDomainException('Contraseña inválida');
    }
  }

  private buildSuccessResponse(jwt: string): LoginResponse {
    return {
      token: jwt
    };
  }
}
