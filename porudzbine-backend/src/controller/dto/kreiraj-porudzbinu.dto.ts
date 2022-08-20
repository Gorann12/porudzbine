import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class KreirajPorudzbinuDto {
  
  @IsOptional()
  napomena: string | null;

  @IsNotEmpty()
  @IsString()
  sto: string;

  @IsNumber({}, {each: true})
  @IsArray()
  jela: Array<number>
}