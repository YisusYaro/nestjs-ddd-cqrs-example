import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Uuid } from 'src/shared/domain/value-object/Uuid';
import { ErrorMessage } from 'src/users/domain/error';
import { UserFactory } from '../../domain/factory';
import { UserRepository } from '../../domain/repository';
import { InjectionToken } from '../injection.token';
import { RegisterUserCommand } from './register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand, void>
{
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    let user = await this.userRepository.findByEmail(command.email);

    if (user)
      throw new BadRequestException(ErrorMessage.USER_IS_ALREADY_REGISTERED);

    user = this.userFactory.create({
      id: Uuid.random().value,
      name: command.name,
      email: command.email,
    });

    user.setPassword(command.password);

    await this.userRepository.save(user);

    user.commit();
  }
}
