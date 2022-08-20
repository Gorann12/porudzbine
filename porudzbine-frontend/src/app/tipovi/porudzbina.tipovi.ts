import { Jelo } from "./jelo.tipovi";
import { Korisnik } from "./korisnik.tipovi";
import { Sto } from "./sto.tipovi";

export interface Porudzbina {
  id: number;
  napomena: string | null;
  korisnik: Omit<Korisnik, 'sifra'>;
  status: StatusPorudzbine;
  sto: Sto,
  ukupanIznos: number,
  kreirana: string;
  jela: Pick<Jelo, "cena" | "naziv">[]
}

export enum StatusPorudzbine {
  primljeno="PRIMLJENO",
  preuzeto="PREUZETO",
  zavrseno="ZAVRSENO"
}