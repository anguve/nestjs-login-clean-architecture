import { VOBaseString } from '@common/shared/domain/value-objects/vo-base-string';

export class VOName extends VOBaseString {
  constructor(name: string) {
    super(name);

    if (!this.isValidName(name)) {
      throw new Error('El nombre no es válido.');
    }
  }

  private isValidName(name: string): boolean {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,}$/;
    return nameRegex.test(name.trim());
  }
}
