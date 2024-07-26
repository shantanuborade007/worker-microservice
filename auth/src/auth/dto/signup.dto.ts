import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'admin', description: 'The role of the user' })
  role: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'tenant123', description: 'The tenant ID of the user' })
  tenetId: string;

  @IsString()
  @ApiProperty({ example: 'client123', description: 'The client ID of the user (optional)', required: false })
  clientId?: string; // Optional

  @IsString()
  @ApiProperty({ example: 'audience123', description: 'The audience of the user (optional)', required: false })
  audience?: string; // Optional

  @IsString()
  @ApiProperty({ example: 'app123', description: 'The app ID of the user (optional)', required: false })
  appId?: string; // Optional
}
