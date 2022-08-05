import { Module } from '@nestjs/common';
import { dbProvider } from '../database/db.provider';
import { KorisnikRepository } from './korisnik.repository';

@Module({
  providers: [dbProvider, KorisnikRepository],
  exports: [KorisnikRepository]
})
export class RepositoryModule {}
