import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(params: { name: string; email: string; password: string }) {
    this.name = params.name;
    this.email = params.email;
    this.password = params.password;
  }
}
