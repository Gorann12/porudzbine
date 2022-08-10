import { Inject, Injectable } from "@nestjs/common";
import { IDatabase } from "pg-promise";
import { PG_CONNECTION } from "src/database/db.provider";
import { KategorijaDbAdapter } from "./adapter/kategorija.db.adapter";
import { BaseRepository } from "./base.repository";
import { KategorijaDbModel } from "./tipovi";

@Injectable()
export class KategorijaRepository extends BaseRepository {
  
  constructor(@Inject(PG_CONNECTION) baza: IDatabase<any>, private adapter: KategorijaDbAdapter) {
    super(baza);
  }

  async dajSveKategorije() {
    const kategorije = await super.izvrsiUpitVratiVise<KategorijaDbModel>(
      'SELECT * FROM kategorija',
      []
    )

    return kategorije.map(this.adapter.konvertuj);
  }
}