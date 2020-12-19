import { InputType } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @IsUUID()
  id?: string

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  name?: string

  @IsEmail()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  email?: string

  @IsString()
  @IsNotEmpty({ message: 'This field cannot be empty' })
  @IsOptional()
  password?: string
}
