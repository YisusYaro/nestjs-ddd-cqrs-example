import { InternalServerErrorException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { ErrorMessage } from './error';

export type UserEssentialProperties = Required<{
  readonly id: string;
  readonly name: string;
  readonly email: string;
}>;

export type UserOptionalProperties = Partial<{
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}>;

export type UserProperties = UserEssentialProperties &
  Required<UserOptionalProperties>;

export interface User {
  properties: () => UserProperties;
  setPassword: (password: string) => void;
  compareId: (id: string) => boolean;
  commit: () => void;
}

export class UserImplement extends AggregateRoot implements User {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;
  private password = '';
  private readonly createdAt: Date = new Date();
  private updatedAt: Date = new Date();

  constructor(properties: UserEssentialProperties & UserOptionalProperties) {
    super();
    Object.assign(this, properties);
  }

  properties(): UserProperties {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  compareId(id: string): boolean {
    return id === this.id;
  }

  setPassword(password: string): void {
    if (this.password !== '' || password === '')
      throw new InternalServerErrorException(ErrorMessage.CAN_NOT_SET_PASSWORD);
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
    this.updatedAt = new Date();
  }

  private comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
