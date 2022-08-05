import { IDatabase } from "pg-promise";

export class BaseRepository {
    
    constructor(private baza: IDatabase<any>) {}

    // TODO: Of course, get rid of this as we should implement some generic methods here
    async getUsers() {
      const upit = 'SELECT * FROM users';
      const korisnici = await this.baza.many<{id: string, email: string}>(upit);

      return korisnici;
    }
}