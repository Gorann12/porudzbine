import { Kategorija } from "./kategorija.tipovi";

export interface Jelo {
  id: number;
  naziv: string;
  sastojci: string;
  porcija: string | null;
  cena: number;
  kategorija: Kategorija;
}

export type NeprosirenoJelo = Omit<Jelo, "kategorija"> & { kategorijaId: number }