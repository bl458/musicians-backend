import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Length,
  IsDate,
} from 'class-validator';

export class CreatePianoUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 25)
  readonly pw: string;

  @IsNotEmpty()
  @MaxLength(35)
  readonly firstName: string;

  @IsNotEmpty()
  @MaxLength(35)
  readonly lastName: string;
}
