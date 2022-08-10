import { KategorijaDbModel } from "./kategorija_db_model";

export interface JeloDbModel extends KategorijaDbModel {
  jelo_id: number;
  jelo_naziv: string;
  jelo_porcija: string;
  jelo_cena: number;
  jelo_sastojci: string;
}