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
  /**
   * Creates an instance of LoginUserUseCase.
   *
   * @param userRepository - Repository to access user data.
   * @param passwordHasherPort - Port to hash and transform tokens.
   * @param passwordVerifierPort - Port to verify plain password against stored hash.
   * @param tokenGeneratorPort - Port to generate authentication tokens.
   */
  constructor(
    @Inject(I_USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(I_PASSWORD_HASHER_PORT)
    private readonly passwordHasherPort: IPasswordHasherPort,
    @Inject(I_PASSWORD_VERIFIER_PORT)
    private readonly passwordVerifierPort: IPasswordVerifierPort,
    @Inject(I_TOKEN_GENERATOR_PORT)
    private readonly tokenGeneratorPort: ITokenGeneratorPort
  ) {
    // Empty constructor: dependencies are injected here.
    // No additional logic is executed to keep single responsibility.
  }
  /**
   * Executes the login process.
   * @param data LoginUserDto containing user email and password.
   * @returns Promise<LoginResponse> with the generated access token.
   * @throws UnauthorizedDomainException if user is not found or credentials are invalid.
   */
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
  /**
   * Finds a user entity by email in the repository.
   * @param email The user's email address.
   * @returns Promise<LoginUserEntity> found user entity.
   * @throws UnauthorizedDomainException if no user is found with the given email.
   */
  private async findUserByEmail(email: string): Promise<LoginUserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      const userMessage = INVALID_CREDENTIALS_MESSAGE;
      const technicalDetails = `No user found with email: ${email}.`;
      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
    return user;
  }
}
