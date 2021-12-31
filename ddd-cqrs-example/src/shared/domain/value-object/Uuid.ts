import { v4, validate } from 'uuid';
import { InternalServerErrorException } from '@nestjs/common';
import { ErrorMessage } from './error';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InternalServerErrorException(ErrorMessage.INVALID_ARGUMENT);
    }
  }

  toString(): string {
    return this.value;
  }
}
