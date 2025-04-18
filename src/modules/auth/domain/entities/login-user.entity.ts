import { BaseUserEntity } from '@src/common/shared/domain/entities/base-user.entity';

export class LoginUserEntity {
  constructor(
    public user: BaseUserEntity,
    public lastLogin?: Date
  ) {}

  get id(): string | undefined {
    return this.user.id;
  }

  get name(): string | undefined {
    return this.user.name;
  }

  get lastName(): string | undefined {
    return this.user.lastName;
  }

  get password(): string | undefined {
    return this.user.password;
  }

  get email(): string | undefined {
    return this.user.email;
  }

  isFirstLogin(): boolean | undefined {
    return !this.lastLogin;
  }
}
