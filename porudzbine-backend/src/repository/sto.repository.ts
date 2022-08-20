import { Inject, Injectable } from "@nestjs/common";
import { IDatabase } from "pg-promise";
import { PG_CONNECTION } from "src/database/db.provider";
import { StoDbAdapter } from "./adapter/sto.db.adapter";
import { BaseRepository } from "./base.repository";
import { StoDbModel } from "./tipovi";

@Injectable()
export class StoRepository extends BaseRepository {

  constructor(@Inject(PG_CONNECTION) baza: IDatabase<any>, private adapter: StoDbAdapter) {
    super(baza);
  }

  async dajSveStolove() {
    const stolovi = await super.izvrsiUpitVratiVise<StoDbModel>('SELECT * FROM sto', []);
    
    return stolovi.map(this.adapter.konvertuj);
  }

}