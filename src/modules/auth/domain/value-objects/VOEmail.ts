export class VOEmail {
  private readonly value: string;

  constructor(email: string) {
    if (!email || !this.isValidEmail(email)) {
      throw new Error('El correo electrónico no es válido.');
    }
    this.value = email;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: VOEmail): boolean {
    return this.value === other.getValue();
  }
}
