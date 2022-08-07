import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegistrujKorisnikaDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  ime: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  sifra: string;
}