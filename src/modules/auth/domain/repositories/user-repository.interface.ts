import { LoginUserEntity } from '@auth/domain/entities/login-user.entity';

export const I_USER_REPOSITORY = Symbol('I_USER_REPOSITORY');
export interface IUserRepository {
  findByEmail(email: string): Promise<LoginUserEntity | null>;
}
