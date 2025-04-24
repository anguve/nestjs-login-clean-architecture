import { VOBaseString } from '@common/shared/domain/value-objects/vo-base-string';

export class VOName extends VOBaseString {
  private static readonly MAX_LENGTH = 150;
  private static readonly NAME_REGEX = /^[a-zA-Z\s'-]+$/;
  constructor(name: string) {
    super(name, 'Name', VOName.MAX_LENGTH, VOName.NAME_REGEX);
  }
}
