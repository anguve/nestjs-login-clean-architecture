import { BaseValueObject } from '@common/shared/domain/value-objects/base.value-object';

const MAX_LENGTH = 255;
export class VOBaseString extends BaseValueObject<string> {
  protected validate(value: string): void {
    this.validateType(value);
    this.validateNotEmpty(value);
    this.validateMaxLength(value);
  }

  private validateType(value: string): void {
    if (typeof value !== 'string') {
      throw new Error('Value must be a string');
    }
  }

  private validateNotEmpty(value: string): void {
    if (value.trim().length === 0) {
      throw new Error('String cannot be empty');
    }
  }

  private validateMaxLength(value: string): void {
    if (value.length > MAX_LENGTH) {
      throw new Error('String cannot exceed 255 characters');
    }
  }
}
