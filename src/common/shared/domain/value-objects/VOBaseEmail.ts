export class VOBaseEmail {
  constructor(private readonly value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error('Email inválido');
    }
  }

  getValue(): string {
    return this.value;
  }
}
