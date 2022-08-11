import { IsEnum, IsNotEmpty } from "class-validator";
import { StatusPorudzbine } from "src/modeli/porudzbina.model";

export class PromeniStatusDto {
  
  @IsNotEmpty()
  @IsEnum(StatusPorudzbine)
  status: StatusPorudzbine;
}