import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { KorisnikRepository } from "src/repository/korisnik.repository";
import { Kredencijali } from "src/utils/tipovi";
import { compare } from "bcrypt";
import { Korisnik } from "src/modeli/korisnik.model";

@Injectable()
export class KorisnikService {
  constructor(private jwt: JwtService, private korisnikRepo: KorisnikRepository) {}

  async prijaviKorisnika(kredencijali: Kredencijali) {
    const { email, sifra } = kredencijali;
    const korisnik = await this.korisnikRepo.dajKorisnikaPoEmailu(email);

    if(!korisnik) {
      throw new Error("Pogresni kredencijali");
    }

    const daLiJeValidnaSifra = await compare(sifra, korisnik.sifra);
    const { sifra: sifraKorisnika, ...korisnikBezSifre } = korisnik;

    if(!daLiJeValidnaSifra) {
      throw new Error("Pogresni kredencijali");
    }

    const token = this.dajToken(korisnik.id);

    return { korisnik: korisnikBezSifre, token }
  }

  async registrujKorisnika(podaci: Omit<Korisnik, "id">) {
    await this.korisnikRepo.kreirajKorisnika(podaci);
    const kreiraniKorisnik = await this.korisnikRepo.dajKorisnikaPoEmailu(podaci.email);

    if(!kreiraniKorisnik) {
      throw new Error("Nesto je poslo po zlu prilikom registracije");
    }

    const token = this.dajToken(kreiraniKorisnik.id);
    const { sifra, ...korisnikBezSifre } = kreiraniKorisnik;

    return { korisnik: korisnikBezSifre, token }
  }

  private dajToken(id: number) {
    return this.jwt.sign({ id }, { expiresIn: '21d' });
  }

  async dajSveKorisnike() {
    return await this.korisnikRepo.dajKorisnike();
  }
}