import { BaseValueObject } from '@common/shared/domain/value-objects/base.value-object';

export class VOBaseNumber extends BaseValueObject<number> {
  protected validate(value: number): void {
    if (!this.isValidNumber(value)) {
      throw new Error('Value must be a valid number');
    }
  }

  private isValidNumber(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
  }
}
