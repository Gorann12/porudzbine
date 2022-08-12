import { Jelo } from "src/modeli/jelo.model";
import { Porudzbina } from "src/modeli/porudzbina.model";

export type PorudzbinaProsirenoJelo = Omit<Porudzbina, "jela"> & { jela: Jelo[] };
export type PodaciZaPorucivanje = { napomena: string | null, jela: Array<{ cena: number, naziv: string, id: number }> }