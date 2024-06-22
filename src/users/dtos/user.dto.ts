import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
