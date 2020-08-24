import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateNameDto {
  @IsNotEmpty()
  @MaxLength(35)
  readonly firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(35)
  readonly middleName: string;

  @IsNotEmpty()
  @MaxLength(35)
  readonly lastName: string;
}
