import { Kategorija } from "./kategorija.tipovi";

export interface Jelo {
  id: number;
  naziv: string;
  sastojci: string;
  porcija: string;
  cena: number;
  kategorija: Kategorija;
}