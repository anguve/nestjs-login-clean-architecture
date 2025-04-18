export class BaseUserEntity {
  private constructor(
    private readonly _id?: string,
    private readonly _name?: string,
    private readonly _lastName?: string,
    private readonly _email?: string,
    private readonly _password?: string,
    private readonly _isActive?: boolean,
    private readonly _isDeleted?: boolean,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date
  ) {}

  // Método estático para crear con contraseña
  static withPassword({
    id,
    name,
    lastName,
    email,
    password,
    isActive,
    isDeleted,
    createdAt,
    updatedAt
  }: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    isActive?: boolean;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): BaseUserEntity {
    return new BaseUserEntity(
      id,
      name,
      lastName,
      email,
      password,
      isActive,
      isDeleted,
      createdAt,
      updatedAt
    );
  }

  // Método estático para crear sin contraseña
  static withoutPassword({
    id,
    name,
    lastName,
    email,
    isActive,
    isDeleted,
    createdAt,
    updatedAt
  }: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    isActive?: boolean;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }): BaseUserEntity {
    return new BaseUserEntity(
      id,
      name,
      lastName,
      email,
      undefined, // No password
      isActive,
      isDeleted,
      createdAt,
      updatedAt
    );
  }

  // 👇 Getters públicos para acceder a los atributos
  get id(): string | undefined {
    return this._id;
  }

  get name(): string | undefined {
    return this._name;
  }

  get lastName(): string | undefined {
    return this._lastName;
  }

  get email(): string | undefined {
    return this._email;
  }

  get password(): string | undefined {
    return this._password;
  }

  get isActive(): boolean | undefined {
    return this._isActive;
  }

  get isDeleted(): boolean | undefined {
    return this._isDeleted;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  get fullName(): string | undefined {
    return `${this._name} ${this._lastName}`;
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
