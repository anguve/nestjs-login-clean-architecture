import { VOBaseString } from '@common/shared/domain/value-objects/vo-base-string';

export class VOUuid extends VOBaseString {
  private static readonly MAX_LENGTH = 36;
  private static readonly UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(uuid: string) {
    super(uuid, 'Id', VOUuid.MAX_LENGTH, VOUuid.UUID_REGEX);
  }
}
