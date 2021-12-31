import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterUserCommand } from '../aplication/commands/register-user.command';
import { RegisterUserBodyDTO } from './dto/register-user.body.dto';
import { ResponseDescription } from './response-description';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: ResponseDescription.CREATED })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  public async registerUser(@Body() body: RegisterUserBodyDTO): Promise<void> {
    const command = new RegisterUserCommand(
      body.name,
      body.email,
      body.password,
    );
    await this.commandBus.execute(command);
  }
}
