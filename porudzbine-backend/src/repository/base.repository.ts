import { IDatabase } from "pg-promise";

export class BaseRepository {
    
    constructor(private baza: IDatabase<any>) {}

    protected async izvrsiUpitVratiJedan<T>(upit: string, vrednosti: Array<any>): Promise<T> {
      return await this.baza.oneOrNone<T>(upit, vrednosti);
    }

    protected async izvrsiUpitVratiVise<T>(upit: string, vrednosti: Array<any>): Promise<Array<T>> {
      return await this.baza.manyOrNone<T>(upit, vrednosti);
    }

    protected async izvrsiUpit(upit: string, vrednosti: Array<any>): Promise<void> {
      return await this.baza.none(upit, vrednosti);
    }
}