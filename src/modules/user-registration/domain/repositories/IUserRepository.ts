import { FindManyOptions } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/UserModel';
import { UserRegisterDto } from '@user-registration/application/dto/UserRegisterDto';
import { UserEntity } from '@user-registration/domain/entities/UserEntity';

export const I_USER_REGISTER_REPOSITORY = Symbol('I_USER_REGISTER_REPOSITORY');
export interface IUserRepository {
  save(data: UserRegisterDto): Promise<UserEntity | null>;
  getAll(): Promise<UserEntity | null>;
  getById(data: any): Promise<UserEntity | null>;
  updateUser(
    id: string,
    data: { isActive: boolean }
  ): Promise<UserEntity | null>;
  searchUser(data: FindManyOptions<UserModel>): Promise<UserEntity[] | null>;
}
