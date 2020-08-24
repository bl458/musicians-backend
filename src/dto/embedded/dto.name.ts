import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateNameDto {
  @IsNotEmpty()
  @MaxLength(35)
  readonly first: string;

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(35)
  readonly middle: string;

  @IsNotEmpty()
  @MaxLength(35)
  readonly last: string;
}
