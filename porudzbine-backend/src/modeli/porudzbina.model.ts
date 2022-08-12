import { Jelo } from "./jelo.model";
import { Korisnik } from "./korisnik.model";

export interface Porudzbina {
  id: number;
  napomena: string | null;
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