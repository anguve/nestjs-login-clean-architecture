import { BaseValueObject } from '@common/shared/domain/value-objects/base.value-object';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';

export class VOBaseNumber extends BaseValueObject<number> {
  protected readonly min: number;
  protected readonly max: number;
  protected readonly inputName: string;

  /**
   * Creates a Value Object for a number with type and range validation.
   * @param value The number value to validate.
   * @param inputName The name of the input (for error messages).
   * @param min The minimum allowed value (optional).
   * @param max The maximum allowed value (optional).
   */
  constructor(
    value: number,
    inputName: string,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER
  ) {
    super(value);
    this.min = min;
    this.max = max;
    this.inputName = inputName;
    this.validate(value);
  }

  /**
   * Runs all validations for the value.
   * @param value The number to validate.
   * @throws UnauthorizedDomainException if any validation fails.
   */
  protected validate(value: number): void {
    this.validateType(value);
    this.validateRange(value);
  }

  /**
   * Validates that the value is a number.
   * @param value The value to check.
   * @throws UnauthorizedDomainException if the value is not a valid number.
   */
  private validateType(value: number): void {
    console.log(typeof value, value);

    if (typeof value !== 'number') {
      const userMessage = `${this.inputName} must be a valid number`;
      const technicalDetails = `Invalid type for ${this.inputName}: expected number but received ${typeof value}`;

      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }

  /**
   * Validates that the number is within the allowed range.
   * @param value The value to check.
   * @throws UnauthorizedDomainException if the value is out of range.
   */
  private validateRange(value: number): void {
    if (value < this.min && value > this.max) {
      const userMessage = `${this.inputName} must be between ${this.min} and ${this.max}`;
      const technicalDetails = `${this.inputName} out of range: ${value}, expected between ${this.min} and ${this.max}`;

      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }
}
