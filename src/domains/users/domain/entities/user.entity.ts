
import { Email } from '../value-objects/email.vo.js';

export type UserRole = 'admin' | 'member';

export type Gender = 'male' | 'female';

interface UserProps {
  id: string;
  name: string;
  email: Email;
  password: string;
  role: UserRole;
  gender: Gender | null;
  createdAt: Date;
}

export class User {
  private constructor(
    private readonly props: UserProps,
  ) {}

  static create(props: UserProps): User {
    if (!props.name.trim()) {
      throw new Error('User name is required');
    }

    if (props.name.length > 100) {
      throw new Error('User name cannot exceed 100 characters');
    }

    return new User({
      ...props,
      name: props.name.trim(),
    });
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get gender(): Gender | null {
    return this.props.gender;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
  get password(): string {
  return this.props.password;
}
update(props: {
  name?: string;
  email?: Email;
  gender?: Gender | null;
}): User {
  const updatedName = props.name?.trim() ?? this.props.name;

  if (!updatedName) {
    throw new Error('User name is required');
  }

  if (updatedName.length > 100) {
    throw new Error('User name cannot exceed 100 characters');
  }

  return new User({
    ...this.props,
    name: updatedName,
    email: props.email ?? this.props.email,
    gender: props.gender !== undefined
      ? props.gender
      : this.props.gender,
  });
}
}
