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
  /**
   * Runs all validation steps on the value.
   *
   * @param value - The string to validate.
   * @throws UnauthorizedDomainException if any validation rule is violated.
   */
  protected validate(value: string): void {
    this.validateType(value);
    this.validateNotEmpty(value);
    this.validateMaxLength(value);
    this.validateFormat(value);
    this.validateMinLength(value);
  }

  /**
   * Ensures the value is actually a string.
   *
   * @param value - The value to check.
   * @throws UnauthorizedDomainException if value is not a string.
   */
  private validateType(value: unknown): void {
    if (typeof value !== 'string') {
      const userMessage = `${this.inputName} must be a string`;
      const technicalDetails = `Invalid type of ${this.inputName}: expected string, got ${typeof value}`;

      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }
  /**
   * Ensures the string is not empty or whitespace only.
   *
   * @param value - The string to check.
   * @throws UnauthorizedDomainException if string is empty or only whitespace.
   */
  private validateNotEmpty(value: string): void {
    if (value.trim().length === 0) {
      const userMessage = `${this.inputName} cannot be empty`;
      const technicalDetails = `${this.inputName} is empty or contains only whitespace`;

      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }

  /**
   * Ensures the string does not exceed the maximum length.
   *
   * @param value - The string to check.
   * @throws UnauthorizedDomainException if length > maxLength.
   */
  private validateMaxLength(value: string): void {
    if (value.length > this.maxLength) {
      const userMessage = `${this.inputName} cannot exceed ${this.maxLength} characters`;
      const technicalDetails = `${this.inputName} length: ${value.length}, max allowed: ${this.maxLength}`;

      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }
  /**
   * Ensures the string meets the minimum length.
   *
   * @param value - The string to check.
   * @throws UnauthorizedDomainException if length < minLength.
   */
  private validateMinLength(value: string): void {
    if (value.length < this.minLength) {
      const userMessage = `${this.inputName} cannot exceed ${this.minLength} characters`;
      const technicalDetails = `${this.inputName} length: ${value.length}, max allowed: ${this.minLength}`;

      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }
  /**
   * Ensures the string matches the provided regex pattern.
   *
   * @param value - The string to test.
   * @throws UnauthorizedDomainException if the string does not match the regex.
   */
  private validateFormat(value: string): void {
    if (this.regex && !this.regex.test(value)) {
      const userMessage = `Invalid ${this.inputName} format`;
      const technicalDetails = `${this.inputName} does not match the expected format: ${value}`;

      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }
}
