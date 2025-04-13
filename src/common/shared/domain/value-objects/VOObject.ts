import { BaseValueObject } from '@common/shared/domain/value-objects/BaseValueObject';

export class VOObject<T extends object> extends BaseValueObject<T> {
  protected validate(value: T): void {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new Error('Value must be a valid object');
    }
  }
}
