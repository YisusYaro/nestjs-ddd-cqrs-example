import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserBodyDTO {
  @IsString()
  @MinLength(1)
  @ApiProperty({ minLength: 1, example: 'Jesús Alejandro Yahuitl Rodríguez' })
  readonly name: string;

  @IsEmail()
  @MinLength(6)
  @ApiProperty({ minLength: 3, example: 'name@domain.com' })
  readonly email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ minLength: 6, example: 'password' })
  readonly password: string;
}
