import { Min, Max, IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePianoPraccDto {
  @IsNotEmpty()
  @MaxLength(50)
  readonly pieceName: string;

  @IsNotEmpty()
  @Min(35)
  @Max(220)
  readonly mspeed: number;
}
