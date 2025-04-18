import { BaseValueObject } from '@common/shared/domain/value-objects/base.value-object';

export class VOBaseBoolean extends BaseValueObject<boolean> {
  protected validate(value: boolean): void {
    if (typeof value !== 'boolean') {
      throw new Error('Value must be a boolean');
    }
  }
}
