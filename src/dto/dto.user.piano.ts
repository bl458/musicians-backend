import { IsEmail, IsNotEmpty, MaxLength, Length } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateNameDto } from './embedded/dto.name';

export class CreatePianoUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 25)
  pw: string;

  @IsNotEmpty()
  @Type(() => CreateNameDto)
  readonly name: CreateNameDto;
}
