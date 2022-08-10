import { Module } from '@nestjs/common';
import { dbProvider } from '../database/db.provider';
import { JeloDbAdapter } from './adapter/jelo.db.adapter';
import { KategorijaDbAdapter } from './adapter/kategorija.db.adapter';
import { KorisnikDbAdapter } from './adapter/korisnik.db.adapter';
import { JeloRepository } from './jelo.repository';
import { KategorijaRepository } from './kategorija.repository';
import { KorisnikRepository } from './korisnik.repository';

@Module({
  providers: [
    dbProvider,
    KorisnikRepository,
    JeloRepository,
    KategorijaRepository,
    KorisnikDbAdapter,
    JeloDbAdapter,
    KategorijaDbAdapter,
  ],
  exports: [KorisnikRepository, JeloRepository, KategorijaRepository],
})
export class RepositoryModule {}
