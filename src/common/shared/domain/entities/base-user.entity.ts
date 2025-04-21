import { BaseUserEntityProps } from '@common/shared/domain/interfaces/base-user-entity.interface';

export class BaseUserEntity {
  protected constructor(private readonly props: BaseUserEntityProps) {}

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string | undefined {
    return this.props.name;
  }

  get lastName(): string | undefined {
    return this.props.lastName;
  }

  get email(): string | undefined {
    return this.props.email;
  }

  get password(): string | undefined {
    return this.props.password;
  }

  get isActive(): boolean | undefined {
    return this.props.isActive;
  }

  get isDeleted(): boolean | undefined {
    return this.props.isDeleted;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get fullName(): string | undefined {
    return `${this.name ?? ''} ${this.lastName ?? ''}`.trim();
  }

  canLogin(): void {
    if (!this.isActive || this.isDeleted) {
      throw new Error('Usuario no válido');
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      isActive: this.isActive,
      isDeleted: this.isDeleted,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      fullName: this.fullName
    };
  }
}
