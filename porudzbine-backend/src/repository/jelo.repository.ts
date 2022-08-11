import { Inject, Injectable } from "@nestjs/common";
import { IDatabase } from "pg-promise";
import { NeprosirenoJelo } from "src/utils/tipovi";
import { PG_CONNECTION } from "../database/db.provider";
import { JeloDbAdapter } from "./adapter/jelo.db.adapter";
import { BaseRepository } from "./base.repository";
import { JeloDbModel } from "./tipovi";

@Injectable()
export class JeloRepository extends BaseRepository {
  
  constructor(@Inject(PG_CONNECTION) baza: IDatabase<any>, private adapter: JeloDbAdapter) {
    super(baza);
  }

  async dajSvaJela() {
    const jela = await super.izvrsiUpitVratiVise<JeloDbModel>(
      'SELECT * FROM jelo JOIN kategorija ON jelo.kategorija_id = kategorija.kategorija_id',
      []
    )

    return jela.map(this.adapter.konvertuj);
  }

  async kreirajJelo(podaci: Omit<NeprosirenoJelo, "id">) {
    return super.izvrsiUpit(
      'INSERT INTO jelo (jelo_naziv, jelo_sastojci, jelo_porcija, jelo_cena, kategorija_id) VALUES($1, $2, $3, $4, $5)',
      [podaci.naziv, podaci.sastojci, podaci.porcija, podaci.cena, podaci.kategorijaId]
    )
  }

  async azurirajJelo(podaci: NeprosirenoJelo) {
    return super.izvrsiUpit(
      'UPDATE jelo SET jelo_naziv=$1, jelo_sastojci=$2, jelo_porcija=$3, jelo_cena=$4, kategorija_id=$5 WHERE jelo_id=$6',
      [podaci.naziv, podaci.sastojci, podaci.porcija, podaci.cena, podaci.kategorijaId, podaci.id]
    )
  }

  async izbrisiJelo(id: number) {
    return super.izvrsiUpit(
      'DELETE FROM jelo WHERE jelo_id=$1',
      [id]
    )
  }

  async dajJeloPoId(id: number) {
    const jelo = await super.izvrsiUpitVratiJedan<JeloDbModel>(
      'SELECT * FROM jelo JOIN kategorija ON jelo.kategorija_id=kategorija.kategorija_id WHERE jelo_id = $1',
      [id]
    )
  
    return this.adapter.konvertuj(jelo);
  }

  async dajJelaPoIdVrednostima(ids: Array<number>) {
    const jela = await super.izvrsiUpitVratiVise<JeloDbModel>(
      'SELECT * FROM jelo JOIN kategorija ON jelo.kategorija_id=kategorija.kategorija_id WHERE jelo_id IN ($1:csv)',
      [ids]
    )

    return jela.map(this.adapter.konvertuj);
  }
}