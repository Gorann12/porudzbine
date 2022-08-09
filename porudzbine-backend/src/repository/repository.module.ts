import { Module } from '@nestjs/common';
import { dbProvider } from '../database/db.provider';
import { KorisnikDbAdapter } from './adapter/korisnik_db.adapter';
import { KorisnikRepository } from './korisnik.repository';

@Module({
  providers: [dbProvider, KorisnikRepository, KorisnikDbAdapter],
  exports: [KorisnikRepository]
})
export class RepositoryModule {}
