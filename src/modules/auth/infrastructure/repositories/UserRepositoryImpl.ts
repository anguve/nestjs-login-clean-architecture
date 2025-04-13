import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '@auth/infrastructure/database/models/UserModel';
import { IUserRepository } from '@auth/domain/repositories/IUserRepository';
import { UserEntity } from '@auth/domain/entities/UserEntity';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    return new UserEntity(
      user.id,
      user.name,
      user.lastName,
      user.email,
      user.password
    );
  }
}
