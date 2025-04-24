import { BaseValueObject } from '@common/shared/domain/value-objects/base.value-object';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';

export class VOBaseString extends BaseValueObject<string> {
  protected readonly maxLength: number;
  protected readonly minLength: number;
  protected readonly inputName: string;
  protected readonly regex?: RegExp;

  /**
   * Creates a Value Object for a string with optional length and format validation.
   * @param value The string value to validate
   * @param maxLength Maximum allowed length (default: 255)
   * @param regex Optional regex for format validation
   */
  constructor(
    value: string,
    inputName: string,
    maxLength = 255,
    regex?: RegExp,
    minLength = 1
  ) {
    super(value);
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.regex = regex;
    this.inputName = inputName;
    this.validate(value);
  }

  protected validate(value: string): void {
    this.validateType(value);
    this.validateNotEmpty(value);
    this.validateMaxLength(value);
    this.validateFormat(value);
    this.validateMinLength(value);
  }

  private validateType(value: unknown): void {
    if (typeof value !== 'string') {
      throw new UnauthorizedDomainException(
        `${this.inputName} must be a string`,
        `Invalid type of ${this.inputName}: expected string, got ${typeof value}`
      );
    }
  }

  private validateNotEmpty(value: string): void {
    if (value.trim().length === 0) {
      throw new UnauthorizedDomainException(
        `${this.inputName} cannot be empty`,
        `${this.inputName} is empty or contains only whitespace`
      );
    }
  }

  private validateMaxLength(value: string): void {
    if (value.length > this.maxLength) {
      throw new UnauthorizedDomainException(
        `${this.inputName} cannot exceed ${this.maxLength} characters`,
        `${this.inputName} length: ${value.length}, max allowed: ${this.maxLength}`
      );
    }
  }

  private validateMinLength(value: string): void {
    if (value.length > this.maxLength) {
      throw new UnauthorizedDomainException(
        `${this.inputName} cannot exceed ${this.minLength} characters`,
        `${this.inputName} length: ${value.length}, max allowed: ${this.minLength}`
      );
    }
  }

  private validateFormat(value: string): void {
    if (this.regex && !this.regex.test(value)) {
      throw new UnauthorizedDomainException(
        `Invalid ${this.inputName} format`,
        `${this.inputName} does not match the expected format: ${value}`
      );
    }
  }
}
