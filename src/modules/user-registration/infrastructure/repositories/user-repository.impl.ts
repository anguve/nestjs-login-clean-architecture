import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { BaseRepository } from '@common/shared/infrastructure/database/repositories/base-repository';
import { IGetAllMeta } from '@common/shared/domain/interfaces/get-all-meta.interface';
import { IUserRepository } from '@user-registration/domain/repositories/user-repository.interface';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterUserEntity } from '@user-registration/domain/entities/user-register-user.entity';
import { UserUpdateDto } from '@user-registration/application/dto/user-update.dto';

@Injectable()
export class UserRepositoryImpl
  extends BaseRepository<UserModel>
  implements IUserRepository
{
  /**
   * Creates an instance of the repository wrapper for UserModel.
   *
   * @param repository - The TypeORM repository for UserModel injected via NestJS.
   */
  constructor(
    @InjectRepository(UserModel)
    repository: Repository<UserModel>
  ) {
    super(repository);
  }
  /**
   * Persists a new user in the database.
   *
   * @param data - Data for registering a new user.
   * @returns A user entity representation after saving.
   */
  async save(data: UserRegisterDto): Promise<UserRegisterUserEntity> {
    await this.create(data);
    return new UserRegisterUserEntity({});
  }

  /**
   * Retrieves a paginated list of users from the database.
   *
   * This method uses the provided pagination parameters and optional query options
   * to fetch user records, maps them into domain entities, and constructs metadata.
   *
   * @param page - The current page number (1-based index).
   * @param limit - The maximum number of users per page.
   * @param options - Optional TypeORM find options for filtering or sorting.
   * @returns A promise that resolves to an object containing the list of users and pagination metadata.
   */
  async getAll(
    page: number,
    limit: number,
    options?: FindManyOptions<UserModel>
  ): Promise<{
    users: UserRegisterUserEntity[];
    meta: IGetAllMeta;
  }> {
    const [models, total] = await this.findAll(page, limit, options);

    const users = models.map(
      (model) =>
        new UserRegisterUserEntity({
          id: model.id,
          name: model.name,
          lastName: model.lastName,
          email: model.email,
          isActive: model.isActive,
          isDeleted: model.isDeleted,
          createdAt: model.createdAt,
          updatedAt: model.updatedAt
        })
    );

    const meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };

    return {
      users,
      meta
    };
  }

  /**
   * Retrieves a user by its unique identifier.
   *
   * @param data - The user's ID.
   * @returns A user entity if found, or null otherwise.
   */
  async getById(data: string): Promise<UserRegisterUserEntity | null> {
    const model = await this.findOneById(data);
    if (!model) {
      return null;
    }
    return new UserRegisterUserEntity({
      id: model.id,
      name: model.name,
      lastName: model.lastName,
      email: model.email,
      isActive: model.isActive,
      isDeleted: model.isDeleted,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    });
  }

  /**
   * Updates an existing user.
   *
   * @param data - The updated user data.
   * @returns A user entity representation after updating.
   */
  async updateUser(data: UserUpdateDto): Promise<UserRegisterUserEntity> {
    await this.update(data.id, data);
    return new UserRegisterUserEntity({});
  }
  /**
   * Soft-deletes a user by marking them as inactive.
   *
   * @param id - The user's ID.
   * @param data - Object containing the `isActive` flag.
   * @returns A user entity representation after deletion.
   */
  async deleteUser(
    id: string,
    data: { isActive: boolean }
  ): Promise<UserRegisterUserEntity> {
    await this.update(id, data);
    return new UserRegisterUserEntity({});
  }
  /**
   * Searches for users using provided criteria.
   *
   * @param options - TypeORM find options to filter the search.
   * @returns A list of matching user entities.
   */
  async searchUser(
    options: FindManyOptions<UserModel>
  ): Promise<UserRegisterUserEntity[]> {
    const models = await this.search(options);
    return models.map(
      (model) =>
        new UserRegisterUserEntity({
          id: model.id,
          name: model.name,
          lastName: model.lastName,
          email: model.email,
          isActive: model.isActive,
          isDeleted: model.isDeleted,
          createdAt: model.createdAt,
          updatedAt: model.updatedAt
        })
    );
  }
}
