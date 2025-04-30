export const I_PASSWORD_HASHER_PORT: unique symbol = Symbol(
  'I_PASSWORD_HASHER_PORT'
);

export interface IPasswordHasherPort {
  to(password: string): string;
  from(password: string): string;
}
