import { FindManyOptions } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterUserEntity } from '@user-registration/domain/entities/user-register-user.entity';
import { IPrimitivesUpdate } from '@user-registration/domain/interfaces/primitives-update.interface';
import { IGetAllMeta } from '@src/common/shared/domain/interfaces/get-all-meta.interface';

export const I_USER_REGISTER_REPOSITORY = Symbol('I_USER_REGISTER_REPOSITORY');
export interface IUserRepository {
  /**
   * Saves a new user to the database.
   *
   * @param data - The data required to register a new user.
   * @returns The registered user entity or null if the operation fails.
   */
  save(data: UserRegisterDto): Promise<UserRegisterUserEntity | null>;
  /**
   * Retrieves a paginated list of users with optional query options.
   *
   * @param page - The current page number.
   * @param limit - The number of records per page.
   * @param options - Optional TypeORM find options.
   * @returns An object containing the list of users and pagination metadata.
   */
  getAll(
    page: number,
    limit: number,
    options?: FindManyOptions<UserModel>
  ): Promise<{
    users: UserRegisterUserEntity[];
    meta: IGetAllMeta;
  }>;
  /**
   * Retrieves a user by its ID.
   *
   * @param data - The user ID.
   * @returns The user entity or null if not found.
   */
  getById(data: string): Promise<UserRegisterUserEntity | null>;
  /**
   * Updates an existing user.
   *
   * @param data - The updated data for the user.
   * @returns The updated user entity or null if the operation fails.
   */
  updateUser(data: IPrimitivesUpdate): Promise<UserRegisterUserEntity | null>;
  /**
   * Soft deletes a user by setting its `isActive` flag.
   *
   * @param id - The ID of the user to delete.
   * @param data - An object containing the `isActive` flag.
   * @returns The updated user entity or null if the operation fails.
   */
  deleteUser(
    id: string,
    data: { isActive: boolean }
  ): Promise<UserRegisterUserEntity | null>;
  /**
   * Searches for users based on specific criteria.
   *
   * @param data - TypeORM query options to filter users.
   * @returns A list of users matching the criteria or null if none found.
   */
  searchUser(
    data: FindManyOptions<UserModel>
  ): Promise<UserRegisterUserEntity[] | null>;
}
