export const I_PASSWORD_HASHER_PORT = Symbol('I_PASSWORD_HASHER_PORT');

export interface IPasswordHasherPort {
  hash(password: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}
