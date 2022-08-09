import { Inject, Injectable } from "@nestjs/common";
import { IDatabase } from "pg-promise";
import { Korisnik } from "src/modeli/korisnik.model";
import { PG_CONNECTION } from "../database/db.provider";
import { KorisnikDbAdapter } from "./adapter/korisnik_db.adapter";
import { BaseRepository } from "./base.repository";
import { KorisnikDbModel } from "./tipovi";

@Injectable()
export class KorisnikRepository extends BaseRepository {
  
  constructor(@Inject(PG_CONNECTION) baza: IDatabase<any>, private adapter: KorisnikDbAdapter) {
    super(baza);
  }

  async dajKorisnike() {
    const korisnici = await super.izvrsiUpitVratiVise<KorisnikDbModel>(
      'SELECT * FROM korisnik WHERE korisnik_id > $1',
      [1],
    );

    return korisnici.map(this.adapter.konvertuj);
  }

  async dajKorisnikaPoId(id: number) {
    const korisnik = await super.izvrsiUpitVratiJedan<KorisnikDbModel>(
      'SELECT * FROM korisnik WHERE korisnik_id = $1',
      [id]
    )

    return this.adapter.konvertuj(korisnik);
  }

  async dajKorisnikaPoEmailu(email: string) {
    const korisnik = await super.izvrsiUpitVratiJedan<KorisnikDbModel>(
      'SELECT * FROM korisnik WHERE korisnik_email = $1',
      [email]
    )

    return this.adapter.konvertuj(korisnik);
  }

  async kreirajKorisnika(podaci: Omit<Korisnik, "id">) {
    const { email, ime, sifra, uloga } = podaci;

    return await super.izvrsiUpit(
      'INSERT INTO korisnik (korisnik_email, korisnik_ime, korisnik_sifra, korisnik_uloga) VALUES($1, $2, $3, $4)',
      [email, ime, sifra, uloga]
    )
  }
}