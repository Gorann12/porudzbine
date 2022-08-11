import { Jelo } from "./jelo.model";
import { Korisnik } from "./korisnik.model";

export interface Porudzbina {
  id: number;
  opis: string | null;
  korisnik: Korisnik;
  status: StatusPorudzbine;
  kreirana: string;
  jela: Pick<Jelo, "cena" | "naziv">[]
}

export enum StatusPorudzbine {
  primljeno="PRIMLJENO",
  preuzeto="PREUZETO",
  zavrseno="ZAVRSENO"
}