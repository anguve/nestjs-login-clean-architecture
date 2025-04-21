export class BaseDomainException extends Error {
  public readonly logMessage: string;

  constructor(message: string, logMessage: string) {
    super(message);
    this.name = this.constructor.name;
    this.logMessage = logMessage;

    Error.captureStackTrace?.(this, this.constructor);
  }
}
