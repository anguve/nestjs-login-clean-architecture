import { BaseValueObject } from '@common/shared/domain/value-objects/base.value-object';

export class VOBaseObject<T extends object> extends BaseValueObject<T> {
  protected validate(value: T): void {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new Error('Value must be a valid object');
    }
  }
}
