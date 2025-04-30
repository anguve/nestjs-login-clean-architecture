import { VOBaseNumber } from '@common/shared/domain/value-objects/vo-base-number';

export class VOQueryPage extends VOBaseNumber {
  private static readonly MAX_LENGTH = 1000;
  private static readonly MIN_LENGTH = 1;
  constructor(page = 1) {
    super(page, 'page', VOQueryPage.MIN_LENGTH, VOQueryPage.MAX_LENGTH);
  }
}
