import { VOBaseString } from '@common/shared/domain/value-objects/VOString';

export class VOLastName extends VOBaseString {
  constructor(lastName: string) {
    super(lastName);

    if (!this.isValidLastName(lastName)) {
      throw new Error('El apellido no es válido.');
    }
  }

  private isValidLastName(lastName: string): boolean {
    const lastNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,}$/;
    return lastNameRegex.test(lastName.trim());
  }
}
