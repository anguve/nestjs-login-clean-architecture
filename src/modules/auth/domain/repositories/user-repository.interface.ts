import { LoginUserEntity } from '@auth/domain/entities/login-user.entity';

export const I_USER_REPOSITORY: unique symbol = Symbol('I_USER_REPOSITORY');
export interface IUserRepository {
  /**
   * Finds a user entity by their email address.
   * @param email - The email address to search for.
   * @returns A Promise resolving to a LoginUserEntity if found, or null if no user exists with that email.
   */
  findByEmail(email: string): Promise<LoginUserEntity | null>;
}
