import { Injectable } from "@nestjs/common";
import { StatusPorudzbine } from "src/modeli/porudzbina.model";
import { JeloRepository } from "src/repository/jelo.repository";
import { PorudzbinaRepository } from "src/repository/porudzbina.repository";

@Injectable()
export class PorudzbinaService {

  constructor(private porudzbinaRepo: PorudzbinaRepository, private jeloRepo: JeloRepository) {}

  async dajSvePorudzbine() {
    return this.porudzbinaRepo.dajSvePorudzbine();
  }

  async dajSveZaKorisnika(id: number) {
    return this.porudzbinaRepo.dajSveZaKorisnika(id);
  }

  async poruci(idKorisnika: number, podaci: { opis: string | null, jela: Array<number> }) {
    const jela = await this.jeloRepo.dajJelaPoIdVrednostima(podaci.jela);

    if(jela.length === 0) {
      throw new Error("Morate poruciti bar jedno jelo!");
    }

    await this.porudzbinaRepo.kreirajPorudzbinu(idKorisnika, {
      jela: jela.map(jelo => ({ cena: jelo.cena, naziv: jelo.naziv, id: jelo.id })),
      opis: podaci.opis
    })
  }

  async promeniStatus(idPorudzbine: number, podaci: { status: StatusPorudzbine }) {
    return this.porudzbinaRepo.promeniStatus(idPorudzbine, podaci.status);
  }
}