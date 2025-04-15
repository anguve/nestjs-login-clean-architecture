import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseRepository } from '@common/shared/infrastructure/database/repositories/base-repository';

import { IUserRepository } from '@user-registration/domain/repositories/IUserRepository';
import { UserRegisterDto } from '@user-registration/application/dto/UserRegisterDto';
import { UserModel } from '@common/shared/infrastructure/database/models/UserModel';

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
}
