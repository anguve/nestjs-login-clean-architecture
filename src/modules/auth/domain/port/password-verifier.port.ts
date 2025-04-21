export const I_PASSWORD_VERIFIER_PORT = 'I_PASSWORD_VERIFIER_PORT';

export interface IPasswordVerifierPort {
  verify(plain: string, stored: string): Promise<void>;
}
