import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { BaseRepository } from '@common/shared/infrastructure/database/repositories/base-repository';
import { IUserRepository } from '@user-registration/domain/repositories/user-repository.interface';
import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterUserEntity } from '../../domain/entities/user-register-user.entity';
import { BaseUserEntity } from '@src/common/shared/domain/entities/base-user.entity';

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

  async save(data: UserRegisterDto): Promise<any> {
    return this.create(data);
  }

  async getAll(): Promise<any> {
    return this.findAll();
  }

  async getById(data: any): Promise<any> {
    return this.findOneById(data);
  }

  async updateUser(id: string, data: { isActive: boolean }): Promise<any> {
    return this.update(id, data);
  }

  async searchUser(
    options: FindManyOptions<UserModel>
  ): Promise<UserRegisterUserEntity[]> {
    const models = await this.search(options);

    return models.map(
      (model) =>
        new UserRegisterUserEntity(
          BaseUserEntity.withoutPassword({
            id: model.id,
            name: model.name,
            lastName: model.lastName,
            email: model.email,
            isActive: model.isActive,
            isDeleted: model.isDeleted,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
          })
        )
    );
  }

  /*   private toUserRegisterUserEntity(model: UserModel): UserRegisterUserEntity {
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
  } */
}
