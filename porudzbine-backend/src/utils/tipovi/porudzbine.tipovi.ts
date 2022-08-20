import { Jelo } from "src/modeli/jelo.model";
import { Porudzbina } from "src/modeli/porudzbina.model";

export type PorudzbinaProsirenoJelo = Omit<Porudzbina, "jela"> & { jela: Jelo[] };
export type ProsireniPodaciZaPorucivanje = { napomena: string | null, ukupanIznos: number, sto: string, jela: Array<{ cena: number, naziv: string, id: number }> }
export type PodaciZaPorucivanje = { napomena: string | null, sto: string, jela: Array<number> }