import { Jelo } from "./jelo.tipovi";
import { Korisnik } from "./korisnik.tipovi";

export interface Porudzbina {
  id: number;
  opis: string | null;
  korisnik: Omit<Korisnik, 'sifra'>;
  status: StatusPorudzbine;
  kreirana: string;
  jela: Pick<Jelo, "cena" | "naziv">[]
}

export enum StatusPorudzbine {
  primljeno="PRIMLJENO",
  preuzeto="PREUZETO",
  zavrseno="ZAVRSENO"
}