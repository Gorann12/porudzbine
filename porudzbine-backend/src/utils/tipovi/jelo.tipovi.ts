import { Jelo } from "src/modeli/jelo.model";

export type NeprosirenoJelo = Omit<Jelo, "kategorija"> & { kategorijaId: number }