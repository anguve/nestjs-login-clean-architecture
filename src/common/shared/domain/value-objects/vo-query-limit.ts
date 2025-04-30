import { VOBaseNumber } from '@common/shared/domain/value-objects/vo-base-number';

export class VOQueryLimit extends VOBaseNumber {
  private static readonly MAX_LENGTH = 1000;
  private static readonly MIN_LENGTH = 1;
  constructor(limit = 10) {
    super(limit, 'limit', VOQueryLimit.MIN_LENGTH, VOQueryLimit.MAX_LENGTH);
  }
}
