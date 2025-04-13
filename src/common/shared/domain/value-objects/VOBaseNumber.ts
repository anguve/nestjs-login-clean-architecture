import { BaseValueObject } from '@common/shared/domain/value-objects/BaseValueObject';

export class VOBaseNumber extends BaseValueObject<number> {
  protected validate(value: number): void {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Value must be a valid number');
    }
  }
}
