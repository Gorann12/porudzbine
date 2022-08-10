import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export class KreirajJeloDto {
  @IsNotEmpty()
  @MaxLength(50)
  naziv: string;

  @IsNotEmpty()
  @MaxLength(100)
  sastojci: string;

  @IsOptional()
  @MaxLength(100)
  porcija: string;
  
  @IsNotEmpty()
  @IsNumber()
  cena: number;

  @IsNotEmpty()
  @IsNumber()
  kategorijaId: number;
}
