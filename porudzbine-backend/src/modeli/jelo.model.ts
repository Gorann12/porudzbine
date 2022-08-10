import { Kategorija } from "./kategorija.model";

export interface Jelo {
  id: number;
  naziv: string;
  sastojci: string;
  porcija: string;
  cena: number;
  kategorija: Kategorija;
}