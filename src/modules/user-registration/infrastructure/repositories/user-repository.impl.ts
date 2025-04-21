import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { BaseRepository } from '@common/shared/infrastructure/database/repositories/base-repository';
import { IUserRepository } from '@user-registration/domain/repositories/user-repository.interface';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterUserEntity } from '@user-registration/domain/entities/user-register-user.entity';
import { UserUpdateDto } from '@user-registration/application/dto/user-update.dto';

@Injectable()
export class UserRepositoryImpl
  extends BaseRepository<UserModel>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserModel)
    repository: Repository<UserModel>
  ) {
    super(repository);
  }

  async save(data: UserRegisterDto): Promise<UserRegisterUserEntity> {
    await this.create(data);
    return new UserRegisterUserEntity({});
  }

  async getAll(): Promise<UserRegisterUserEntity[]> {
    const models = await this.findAll();

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

  async updateUser(data: UserUpdateDto): Promise<UserRegisterUserEntity> {
    await this.update(data.id, data);
    return new UserRegisterUserEntity({});
  }

  async deleteUser(
    id: string,
    data: { isActive: boolean }
  ): Promise<UserRegisterUserEntity> {
    await this.update(id, data);
    return new UserRegisterUserEntity({});
  }

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
