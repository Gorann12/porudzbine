import { Jelo } from "./jelo.model";
import { Korisnik } from "./korisnik.model";
import { Sto } from "./sto.model";

export interface Porudzbina {
  id: number;
  napomena: string | null;
  korisnik: Omit<Korisnik, 'sifra'>;
  sto: Sto;
  status: StatusPorudzbine;
  kreirana: string;
  ukupanIznos: number;
  jela: Pick<Jelo, "cena" | "naziv">[]
}

export enum StatusPorudzbine {
  primljeno="PRIMLJENO",
  preuzeto="PREUZETO",
  zavrseno="ZAVRSENO"
}