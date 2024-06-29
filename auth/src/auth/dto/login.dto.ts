import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  readonly password: string;
}
