import { BaseValueObject } from '@common/shared/domain/value-objects/base.value-object';

export class VOBaseArray<T> extends BaseValueObject<T[]> {
  protected validate(value: T[]): void {
    if (!Array.isArray(value)) {
      throw new Error('Value must be an array');
    }
  }
}
