import { Module } from '@nestjs/common';
import { dbProvider } from '../database/db.provider';
import { JeloDbAdapter } from './adapter/jelo.db.adapter';
import { KategorijaDbAdapter } from './adapter/kategorija.db.adapter';
import { KorisnikDbAdapter } from './adapter/korisnik.db.adapter';
import { PorudzbinaDbAdapter } from './adapter/porudzbina.db.adapter';
import { JeloRepository } from './jelo.repository';
import { KategorijaRepository } from './kategorija.repository';
import { KorisnikRepository } from './korisnik.repository';
import { PorudzbinaRepository } from './porudzbina.repository';

@Module({
  providers: [
    dbProvider,
    KorisnikRepository,
    JeloRepository,
    KategorijaRepository,
    PorudzbinaRepository,
    KorisnikDbAdapter,
    JeloDbAdapter,
    KategorijaDbAdapter,
    PorudzbinaDbAdapter,
  ],
  exports: [
    KorisnikRepository,
    JeloRepository,
    KategorijaRepository,
    PorudzbinaRepository,
  ],
})
export class RepositoryModule {}
