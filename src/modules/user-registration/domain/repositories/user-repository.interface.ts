import { FindManyOptions } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterUserEntity } from '@user-registration/domain/entities/user-register-user.entity';
import { IPrimitivesUpdate } from '@user-registration/domain/interfaces/primitives-update.interface';

export const I_USER_REGISTER_REPOSITORY = Symbol('I_USER_REGISTER_REPOSITORY');
export interface IUserRepository {
  save(data: UserRegisterDto): Promise<UserRegisterUserEntity | null>;
  getAll(): Promise<UserRegisterUserEntity[] | null>;
  getById(data: string): Promise<UserRegisterUserEntity | null>;
  updateUser(data: IPrimitivesUpdate): Promise<UserRegisterUserEntity | null>;
  deleteUser(
    id: string,
    data: { isActive: boolean }
  ): Promise<UserRegisterUserEntity | null>;
  searchUser(
    data: FindManyOptions<UserModel>
  ): Promise<UserRegisterUserEntity[] | null>;
}
