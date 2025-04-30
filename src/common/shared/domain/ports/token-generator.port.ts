export const I_TOKEN_GENERATOR_PORT = 'I_TOKEN_GENERATOR_PORT';

export interface ITokenGeneratorPort {
  generate(user: string): Promise<string>;
}
