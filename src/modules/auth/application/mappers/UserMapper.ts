import { UserEntity } from '@auth/domain/entities/UserEntity';
import { UserModel } from '@auth/infrastructure/database/models/UserModel';

export class UserMapper {
  static toDomain(model: UserModel): UserEntity {
    return new UserEntity(
      model.id,
      model.name,
      model.lastName,
      model.email,
      model.password
    );
  }

  static toPersistence(entity: UserEntity): Partial<UserModel> {
    return {
      id: entity.id,
      name: entity.name,
      lastName: entity.lastName,
      email: entity.email,
      password: entity.password
    };
  }
}
