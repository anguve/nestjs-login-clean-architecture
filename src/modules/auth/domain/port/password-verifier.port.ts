export const I_PASSWORD_VERIFIER_PORT = 'I_PASSWORD_VERIFIER_PORT';

export interface IPasswordVerifierPort {
  /**
   * Verifies if the provided plain password matches the stored hashed password.
   * @param plain - The plain text password input to verify.
   * @param stored - The stored hashed password to compare against.
   * @throws UnauthorizedDomainException if verification fails.
   */
  verify(plain: string, stored: string): Promise<void>;
}
