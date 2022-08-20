import { KategorijaDbModel } from "./kategorija.db.model";

export interface JeloDbModel extends KategorijaDbModel {
  jelo_id: number;
  jelo_naziv: string;
  jelo_porcija: string;
  jelo_cena: string;
  jelo_sastojci: string;
}