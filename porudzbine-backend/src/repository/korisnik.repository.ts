import { Inject, Injectable } from "@nestjs/common";
import { IDatabase } from "pg-promise";
import { Korisnik } from "src/modeli/korisnik.model";
import { PG_CONNECTION } from "../database/db.provider";
import { BaseRepository } from "./base.repository";

@Injectable()
export class KorisnikRepository extends BaseRepository {
  
  constructor(@Inject(PG_CONNECTION) baza: IDatabase<any>) {
    super(baza);
  }

  async dajKorisnike() {
    return await super.izvrsiUpitVratiVise<Omit<Korisnik, 'sifra'>>(
      'SELECT id, ime, email, uloga, sifra FROM users WHERE id > $1',
      [1],
    );
  }

  async dajKorisnikaPoId(id: number) {
    return await super.izvrsiUpitVratiJedan<Korisnik>(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )
  }

  async dajKorisnikaPoEmailu(email: string) {
    return await super.izvrsiUpitVratiJedan<Korisnik>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
  }

  async kreirajKorisnika(podaci: Omit<Korisnik, "id">) {
    return await super.izvrsiUpitVratiJedan<Korisnik>(
      'INSERT INTO users ($1:name) VALUES($1:csv)',
      [podaci]
    )
  }
}