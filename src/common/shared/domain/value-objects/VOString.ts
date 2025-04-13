import { BaseValueObject } from '@common/shared/domain/value-objects/BaseValueObject';

export class VOString extends BaseValueObject<string> {
  protected validate(value: string): void {
    if (typeof value !== 'string') {
      throw new Error('Value must be a string');
    }
    if (value.trim().length === 0) {
      throw new Error('String cannot be empty');
    }
  }
}
