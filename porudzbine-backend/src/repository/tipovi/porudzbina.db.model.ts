import { StatusPorudzbine } from "src/modeli/porudzbina.model";

export interface PorudzbinaDbModel {
  porudzbina_id: number;
  porudzbina_opis: string | null;
  porudzbina_korisnik_id: number;
  porudzbina_status: StatusPorudzbine;
  porudzbina_kreirana: string;
  pj_porudzbina_id: number;
  pj_jelo_id: number;
  pj_jelo_cena: number;
  pj_jelo_naziv: string;
}