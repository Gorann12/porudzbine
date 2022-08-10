import { Module } from '@nestjs/common';
import { dbProvider } from '../database/db.provider';
import { JeloDbAdapter } from './adapter/jelo.db.adapter';
import { KorisnikDbAdapter } from './adapter/korisnik.db.adapter';
import { JeloRepository } from './jelo.repository';
import { KorisnikRepository } from './korisnik.repository';

@Module({
  providers: [
    dbProvider,
    KorisnikRepository,
    JeloRepository,
    KorisnikDbAdapter,
    JeloDbAdapter
  ],
  exports: [KorisnikRepository, JeloRepository],
})
export class RepositoryModule {}
