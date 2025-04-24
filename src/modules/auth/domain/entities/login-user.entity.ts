import { BaseUserEntity } from '@common/shared/domain/entities/base-user.entity';
import { LoginUserEntityProps } from '@auth/domain/interfaces/login-user-entity.interface';

export class LoginUserEntity extends BaseUserEntity {
  constructor(props: LoginUserEntityProps) {
    super(props);
  }
}
