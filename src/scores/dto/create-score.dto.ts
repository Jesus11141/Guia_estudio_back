import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateScoreDto {
  @IsUUID()
  lessonId: string;

  @IsInt()
  @Min(0)
  score: number;

  @IsInt()
  @Min(1)
  totalQuestions: number;
}
