import { Injectable } from "@nestjs/common";
import { Korisnik } from "src/modeli/korisnik.model";
import { KorisnikDbModel } from "../tipovi";

@Injectable()
export class KorisnikDbAdapter {
  
  konvertuj(model: KorisnikDbModel): Korisnik {
    return model ? {
      id: model.korisnik_id,
      email: model.korisnik_email,
      ime: model.korisnik_ime,
      sifra: model.korisnik_sifra,
      uloga: model.korisnik_uloga
    } : null;
  }

}