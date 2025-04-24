export abstract class BaseValueObject<T> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
  }

  protected abstract validate(value: T): void;

  public get value(): T {
    return this._value;
  }

  public equals(vo: BaseValueObject<T>): boolean {
    return this._value === vo.value;
  }

  public toString(): string {
    return String(this._value);
  }
}
