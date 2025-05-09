export const I_JWT_SERVICE_PORT: unique symbol = Symbol('I_JWT_SERVICE_PORT');

export interface IJwtServicePort {
  sign(payload: object): Promise<string>;
  verify<T>(token: string): Promise<T>;
}
