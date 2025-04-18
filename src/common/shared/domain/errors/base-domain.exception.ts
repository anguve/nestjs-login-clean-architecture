export class BaseDomainException extends Error {
  public readonly errorCode: string;

  constructor(message: string, errorCode = 'DOMAIN_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
