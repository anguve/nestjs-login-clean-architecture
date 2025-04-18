import { FindManyOptions } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterUserEntity } from '../entities/user-register-user.entity';

export const I_USER_REGISTER_REPOSITORY = Symbol('I_USER_REGISTER_REPOSITORY');
export interface IUserRepository {
  save(data: UserRegisterDto): Promise<UserRegisterUserEntity | null>;
  getAll(): Promise<UserRegisterUserEntity | null>;
  getById(data: any): Promise<UserRegisterUserEntity | null>;
  updateUser(
    id: string,
    data: { isActive: boolean }
  ): Promise<UserRegisterUserEntity | null>;
  searchUser(
    data: FindManyOptions<UserModel>
  ): Promise<UserRegisterUserEntity[] | null>;
}
