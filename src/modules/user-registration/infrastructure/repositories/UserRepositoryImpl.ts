import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/UserModel';
import { BaseRepository } from '@common/shared/infrastructure/database/repositories/base-repository';
import { IUserRepository } from '@user-registration/domain/repositories/IUserRepository';
import { UserRegisterDto } from '@user-registration/application/dto/UserRegisterDto';

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

  async save(data: UserRegisterDto): Promise<UserModel> {
    return this.create(data);
  }

  async getAll(): Promise<any> {
    return this.findAll();
  }

  async getById(data: any): Promise<any> {
    return this.findOneById(data);
  }

  async updateUser(
    id: string,
    data: { isActive: boolean }
  ): Promise<UserModel> {
    return this.update(id, data);
  }

  async searchUser(options: FindManyOptions<UserModel>): Promise<UserModel[]> {
    return this.search(options);
  }
}
