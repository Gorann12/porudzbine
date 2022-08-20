import { Inject, Injectable } from "@nestjs/common";
import { IDatabase } from "pg-promise";
import { PG_CONNECTION } from "src/database/db.provider";
import { Porudzbina, StatusPorudzbine } from "src/modeli/porudzbina.model";
import { PodaciZaPorucivanje, PorudzbinaProsirenoJelo } from "src/utils/tipovi";
import { PorudzbinaDbAdapter } from "./adapter/porudzbina.db.adapter";
import { BaseRepository } from "./base.repository";
import { PorudzbinaDbModel, PorudzbinDbModelProsirenoJelo } from "./tipovi";

@Injectable()
export class PorudzbinaRepository extends BaseRepository {
  
  constructor(@Inject(PG_CONNECTION) baza: IDatabase<any>, private adapter: PorudzbinaDbAdapter) {
    super(baza);
  }

  async dajSvePorudzbine() {
    const porudzbine = await super.izvrsiUpitVratiVise<PorudzbinaDbModel>(
      'SELECT * FROM porudzbina JOIN korisnik ON porudzbina_korisnik_id=korisnik_id JOIN sto ON porudzbina_sto_id=sto_oznaka JOIN porudzbina_jelo ON porudzbina_id=pj_porudzbina_id', 
      []
    );

    return this.adapter.konvertuj(porudzbine);
  }

  async dajSveZaKorisnika(idKorisnika: number) {
    const porudzbine = await super.izvrsiUpitVratiVise<PorudzbinaDbModel>(
      'SELECT * FROM porudzbina JOIN korisnik ON porudzbina_korisnik_id=korisnik_id JOIN sto ON porudzbina_sto_id=sto_oznaka JOIN porudzbina_jelo ON porudzbina_id=pj_porudzbina_id WHERE porudzbina_korisnik_id=$1',
      [idKorisnika]
    )

    return this.adapter.konvertuj(porudzbine);
  }

  async kreirajPorudzbinu(idKorisnika: number, podaci: PodaciZaPorucivanje) {
    const idPorudzbine = await super.izvrsiUpitVratiJedan<{ porudzbina_id: number }>(
      'INSERT INTO porudzbina(porudzbina_napomena, porudzbina_korisnik_id) VALUES ($1, $2) RETURNING porudzbina_id',
      [podaci.napomena, idKorisnika]
    )

    for(const jelo of podaci.jela) {
      await super.izvrsiUpit(
        'INSERT INTO porudzbina_jelo(pj_porudzbina_id, pj_jelo_id, pj_jelo_cena, pj_jelo_naziv) VALUES ($1, $2, $3, $4)',
        [idPorudzbine.porudzbina_id, jelo.id, jelo.cena, jelo.naziv]
      )
    }
  }

  async promeniStatus(idPorudzbine: number, status: StatusPorudzbine) {
    return await super.izvrsiUpit(
      'UPDATE porudzbina SET porudzbina_status=$1 WHERE porudzbina_id=$2',
      [status, idPorudzbine]
    )
  }
}