import { Injectable } from '@nestjs/common';
import { KorisnikRepository } from './repository/korisnik.repository';

@Injectable()
export class AppService {

  constructor(private korisnikRepo: KorisnikRepository) {}

  async getUsers() {
    return await this.korisnikRepo.dajKorisnike();
  }
}
