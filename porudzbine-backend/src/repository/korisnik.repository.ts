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
      'SELECT $1:name FROM users WHERE id > $2',
      [['id', 'ime', 'email', 'uloga'], 1],
    );
  }
}