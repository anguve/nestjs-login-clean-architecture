// user-repository.impl.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '@auth/infrastructure/database/models/UserModel';
import { IUserRepository } from '@auth/domain/repositories/IUserRepository';
import { BaseRepository } from '@common/shared/infrastructure/database/repositories/base-repository';

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

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.findOne({ email });
  }
}
