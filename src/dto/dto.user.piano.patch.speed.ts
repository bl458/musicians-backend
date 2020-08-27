import { Min, Max, IsNotEmpty } from 'class-validator';

export class CreatePianoPatchSpeedDto {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  @Min(35)
  @Max(220)
  readonly mspeed: number;
}
