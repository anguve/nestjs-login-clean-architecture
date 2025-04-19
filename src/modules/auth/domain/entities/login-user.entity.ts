import { BaseUserEntity } from '@common/shared/domain/entities/base-user.entity';

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

  get isActive(): boolean | undefined {
    return this.user.isActive;
  }

  get isDeleted(): boolean | undefined {
    return this.user.isDeleted;
  }

  isFirstLogin(): boolean | undefined {
    return !this.lastLogin;
  }

  toJSON() {
    const { fullName, ...rest } = this.user.toJSON();
    return rest;
  }
}
