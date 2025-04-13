export class VOPassword {
  private readonly value: string;

  constructor(password: string) {
    if (!password || !this.isValidPassword(password)) {
      throw new Error(
        'La contraseña no es válida. Debe tener al menos 8 caracteres.'
      );
    }
    this.value = password;
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 8;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: VOPassword): boolean {
    return this.value === other.getValue();
  }
}
