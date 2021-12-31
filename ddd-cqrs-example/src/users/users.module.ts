import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterUserHandler } from './aplication/commands/register-user.handler';
import { databaseProviders } from './infrastucture/providers/database.providers';
import { Provider } from '@nestjs/common';
import { usersProviders } from './infrastucture/providers/users.provides';
import { UsersController } from './interface/users.controller';
import { UserFactory } from './domain/factory';
import { UserRepositoryImplement } from './infrastucture/repositories/user.repository';

import { InjectionToken } from './aplication/injection.token';

const infrastructure: Provider[] = [
  ...databaseProviders,
  ...usersProviders,
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
];

const application = [RegisterUserHandler];

const domain = [UserFactory];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [...application, ...infrastructure, ...domain],
})
export class UsersModule {}
