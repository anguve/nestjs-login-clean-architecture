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
   * Finds a user by their email address in the database.
   *
   * @param email - The email address used to search for the user.
   * @returns A Promise that resolves to a `LoginUserEntity` containing user details if found, or `null` if no user exists with the provided email.
   */
  async findByEmail(email: string): Promise<LoginUserEntity | null> {
    const model = await this.findOne({ email });

    if (!model) {
      return null;
    }

    return new LoginUserEntity({
      id: model.id,
      email: model.email,
      password: model.password,
      isActive: model.isActive,
      isDeleted: model.isDeleted
    });
  }
}
