import { IsArray, IsNumber, IsOptional } from "class-validator";

export class KreirajPorudzbinuDto {
  
  @IsOptional()
  napomena: string | null;

  @IsNumber({}, {each: true})
  @IsArray()
  jela: Array<number>
}