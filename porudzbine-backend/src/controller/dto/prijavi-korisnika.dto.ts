import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class PrijaviKorisnikaDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  sifra: string;
}