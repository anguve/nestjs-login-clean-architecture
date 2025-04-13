import { UserEntity } from '@auth/domain/entities/UserEntity';

export const I_USER_REPOSITORY = Symbol('I_USER_REPOSITORY');
export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
}
