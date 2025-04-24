import { VOBaseString } from '@common/shared/domain/value-objects/vo-base-string';

export class VOLastName extends VOBaseString {
  private static readonly MAX_LENGTH = 150;
  private static readonly LAST_NAME_REGEX = /^[a-zA-Z\s'-]+$/;
  constructor(name: string) {
    super(name, 'LastName', VOLastName.MAX_LENGTH, VOLastName.LAST_NAME_REGEX);
  }
}
