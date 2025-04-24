import { VOBaseString } from '@common/shared/domain/value-objects/vo-base-string';

export class VOEmail extends VOBaseString {
  private static readonly MAX_LENGTH = 255;
  private static readonly EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  constructor(email: string) {
    super(email, 'Email', VOEmail.MAX_LENGTH, VOEmail.EMAIL_REGEX);
  }
}
