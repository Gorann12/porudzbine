import { IsNotEmpty } from 'class-validator';

export class PrijaviKorisnikaDto {

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  sifra: string;
}