
export class Email {
  private constructor(
    public readonly value: string,
  ) {}

  static create(value: string): Email {
    const normalizedEmail = value.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      throw new Error('Invalid email address');
    }

    return new Email(normalizedEmail);
  }
}
