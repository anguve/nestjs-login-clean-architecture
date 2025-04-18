import { VOBaseString } from '@common/shared/domain/value-objects/vo-base-string';

export class VOPassword extends VOBaseString {
  constructor(password: string) {
    super(password);

    if (!this.isValidPassword(password)) {
      throw new Error(
        'La contraseña no es válida. Debe tener al menos 8 caracteres, incluir una letra mayúscula, una letra minúscula y un número.'
      );
    }
  }

  private isValidPassword(password: string): boolean {
    const passwordRegex = /^\d+$/;
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
}
