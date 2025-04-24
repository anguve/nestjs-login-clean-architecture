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
  /**
   * Constructs the UserRegisterUseCase with injected user repository.
   *
   * @param userRepository - Repository interface for user persistence.
   */
  constructor(
    @Inject(I_USER_REGISTER_REPOSITORY)
    private readonly userRepository: IUserRepository
  ) {
    /* Empty constructor: dependencies are injected here.
     No additional logic is executed to keep single responsibility. */
  }
  /**
   * Execute the user registration process.
   *
   * @param data - User registration data (DTO).
   * @returns A success response with registered user information.
   * @throws UnauthorizedDomainException if a user with the same email already exists.
   */
  async execute(data: UserRegisterDto): Promise<UserRegisterResponse> {
    const userRegisterAggregateRoot = new UserRegisterAggregateRoot(data);
    await this.ensureUserExistsByEmail(
      userRegisterAggregateRoot.getEmail() ?? ''
    );
    await this.userRegisterDB(userRegisterAggregateRoot.toPrimitives());

    return {};
  }
  /**
   * Ensures that no user exists with the provided email.
   *
   * @param email - Email to check for existing user.
   * @throws UnauthorizedDomainException if a user with the given email already exists.
   */
  private async ensureUserExistsByEmail(email: string): Promise<void> {
    const response = await this.userRepository.searchUser({
      where: { email },
      select: ['id', 'email']
    });

    if (response && response?.length > 0) {
      const userMessage =
        'The user already exists. Please verify the information and try again.';
      const technicalDetails = `A user with the provided email already exists: ${email} (records found: ${response.length})`;

      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }
  /**
   * Persists the new user in the database.
   *
   * @param data - User data to be saved in the repository.
   */
  private async userRegisterDB(data: UserRegisterDto): Promise<void> {
    await this.userRepository.save(data);
  }
}
