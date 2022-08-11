import { UlogaKorisnika } from "src/modeli/korisnik.model";

export interface KorisnikDbModel {
  korisnik_id: number;
  korisnik_ime: string;
  korisnik_email: string;
  korisnik_sifra: string;
  korisnik_uloga: UlogaKorisnika;
}