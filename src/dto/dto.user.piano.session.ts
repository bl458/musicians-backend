import { IsNotEmpty, IsEmail, MaxLength, Length } from 'class-validator';

export class CreatePianoUserSessionDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(254)
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 25)
  readonly pw: string;
}
