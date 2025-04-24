import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@common/shared/infrastructure/database/repositories/base-repository';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { IUserRepository } from '@auth/domain/repositories/user-repository.interface';
import { LoginUserEntity } from '@auth/domain/entities/login-user.entity';

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

  async findByEmail(email: string): Promise<LoginUserEntity | null> {
    const model = await this.findOne({ email });

    if (!model) {
      return null;
    }

    return new LoginUserEntity({
      id: model.id,
      password: model.password,
      isActive: model.isActive,
      isDeleted: model.isDeleted
    });
  }
}
