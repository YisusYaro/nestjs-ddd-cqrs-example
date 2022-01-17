import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserFactory } from '../../../domain/factory';
import { UserRepository } from '../../../domain/repository';
import { User } from '../../../domain/user';
import { InjectionToken } from '../../injection.token';
import { RegisterUserCommand } from './register-user.command';
import { RegisterUserHandler } from './register-user.handler';

describe('RegisterUserHandler', () => {
  let repository: UserRepository;
  let handler: RegisterUserHandler;
  let factory: UserFactory;

  beforeEach(async () => {
    const repositoryProvider: Provider = {
      provide: InjectionToken.USER_REPOSITORY,
      useValue: {},
    };

    const factoryProvider: Provider = {
      provide: UserFactory,
      useValue: {},
    };

    const providers: Provider[] = [
      RegisterUserHandler,
      repositoryProvider,
      factoryProvider,
    ];
    const moduleMetaData: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetaData).compile();

    handler = testModule.get<RegisterUserHandler>(RegisterUserHandler);
    repository = testModule.get(InjectionToken.USER_REPOSITORY);
    factory = testModule.get<UserFactory>(UserFactory);
  });

  describe('execute', () => {
    it('should execute RegisterUserCommand', async () => {
      const user: User = {
        properties: jest.fn(),
        setPassword: jest.fn(),
        compareId: jest.fn(),
        commit: jest.fn(),
      };

      repository.findByEmail = jest.fn().mockResolvedValue(undefined);
      repository.save = jest.fn().mockResolvedValue(undefined);
      factory.create = jest.fn().mockReturnValue(user);

      const command = new RegisterUserCommand({
        name: 'test',
        email: 'test@mail.com',
        password: 'test',
      });

      await expect(handler.execute(command)).resolves.toBeUndefined();
    });
  });
});
