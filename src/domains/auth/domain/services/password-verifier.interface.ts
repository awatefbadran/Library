export interface PasswordVerifier {
  compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}