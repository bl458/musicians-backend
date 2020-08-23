import { isEmail, isString } from 'class-validator';

export class CreatePianoUserDto {
  readonly email: string;

  readonly pw: string;

  readonly firstName: string;

  readonly lastName: string;
}
