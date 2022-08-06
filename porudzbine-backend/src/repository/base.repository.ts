import { IDatabase } from "pg-promise";

interface opcijeUpita {
  quantity?: "vise" | "jedan" | "nijedan"
}

export class BaseRepository {
    
    constructor(private baza: IDatabase<any>) {}

    protected async izvrsiUpitVratiJedan<T>(upit: string, vrednosti: Array<any>): Promise<T> {
      return await this.baza.one<T>(upit, vrednosti);
    }

    protected async izvrsiUpitVratiVise<T>(upit: string, vrednosti: Array<any>): Promise<Array<T>> {
      return await this.baza.many<T>(upit, vrednosti);
    }

    protected async izvrsiUpit(upit: string, vrednosti: Array<any>): Promise<void> {
      return await this.baza.none(upit, vrednosti);
    }
}