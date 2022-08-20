import { StatusPorudzbine } from "src/modeli/porudzbina.model";
import { JeloDbModel } from "./jelo.db.model";
import { KategorijaDbModel } from "./kategorija.db.model";
import { KorisnikDbModel } from "./korisnik.db.model";
import { StoDbModel } from "./sto.db.model";

export interface PorudzbinaDbModel extends KorisnikDbModel, StoDbModel {
  porudzbina_id: number;
  porudzbina_napomena: string | null;
  porudzbina_korisnik_id: number;
  porudzbina_sto_id: string;
  porudzbina_status: StatusPorudzbine;
  porudzbina_kreirana: string;
  pj_porudzbina_id: number;
  pj_jelo_id: number;
  pj_jelo_cena: number;
  pj_jelo_naziv: string;
}

export type PorudzbinDbModelProsirenoJelo = PorudzbinaDbModel & KategorijaDbModel & JeloDbModel;