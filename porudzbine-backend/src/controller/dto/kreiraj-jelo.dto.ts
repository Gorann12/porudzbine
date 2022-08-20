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
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Maksimalno 2 decimalna mesta za cenu!' })
  cena: number;

  @IsNotEmpty()
  @IsNumber()
  kategorijaId: number;
}
