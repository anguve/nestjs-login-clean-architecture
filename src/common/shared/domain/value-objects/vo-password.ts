import { VOBaseString } from '@common/shared/domain/value-objects/vo-base-string';

export class VOPassword extends VOBaseString {
  private static readonly MAX_LENGTH = 100;
  private static readonly PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

  constructor(password: string) {
    super(
      password,
      'Password',
      VOPassword.MAX_LENGTH,
      VOPassword.PASSWORD_REGEX
    );
  }
}
