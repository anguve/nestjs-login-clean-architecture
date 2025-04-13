import { VOBaseString } from '@common/shared/domain/value-objects/VOString';

export class VOEmail extends VOBaseString {
  constructor(email: string) {
    super(email);

    if (!this.isValidEmail(email)) {
      throw new Error('El correo electrónico no es válido.');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
