import { UserRegisterDto } from '@user-registration/application/dto/UserRegisterDto';
import { UserEntity } from '../entities/UserEntity';

export const I_USER_REGISTER_REPOSITORY = Symbol('I_USER_REGISTER_REPOSITORY');
export interface IUserRepository {
  save(data: UserRegisterDto): Promise<UserEntity | null>;
  getAll(): Promise<UserEntity | null>;
  getById(data: any): Promise<UserEntity | null>;
  updateUser(id: string, data: any): Promise<UserEntity | null>;
  searchUser(data: any): Promise<UserEntity[] | null>;
}
