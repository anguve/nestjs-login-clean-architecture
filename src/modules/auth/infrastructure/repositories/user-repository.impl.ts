import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { IUserRepository } from '@auth/domain/repositories/user-repository.interface';
import { BaseRepository } from '@common/shared/infrastructure/database/repositories/base-repository';
import { LoginUserEntity } from '../../domain/entities/login-user.entity';
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

  async findByEmail(email: string): Promise<LoginUserEntity | null> {
    const model = await this.findOne({ email });

    if (!model) {
      return null;
    }

    return new LoginUserEntity(
      BaseUserEntity.withPassword({
        id: model.id,
        name: model.name,
        lastName: model.lastName,
        email: model.email,
        password: model.password
      })
    );
  }
}
