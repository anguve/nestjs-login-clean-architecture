/* import { UserModel } from '@common/shared/infrastructure/database/models/user.model';

import { UserRegisterDto } from '@user-registration/application/dto/user-register.dto';
import { UserRegisterUserEntity } from '../../domain/entities/user-register-user.entity';

export class UserMapper {
  dtoToModel(dto: UserRegisterDto): UserModel {
    return {
      ...dto,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  modelToEntity(model: UserModel): UserRegisterUserEntity {
    return {
      id: model.id,
      name: model.name,
      lastName: model.lastName,
      email: model.email
    };
  }
}
 */
