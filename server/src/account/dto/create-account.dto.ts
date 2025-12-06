import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @IsOptional()
  expansion?: number;
}
