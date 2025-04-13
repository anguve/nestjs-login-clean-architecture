import { BaseValueObject } from '@common/shared/domain/value-objects/BaseValueObject';

export class VOBoolean extends BaseValueObject<boolean> {
  protected validate(value: boolean): void {
    if (typeof value !== 'boolean') {
      throw new Error('Value must be a boolean');
    }
  }
}
