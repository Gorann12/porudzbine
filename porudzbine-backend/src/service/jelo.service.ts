import { Injectable } from "@nestjs/common";
import { JeloRepository } from "src/repository/jelo.repository";
import { NeprosirenoJelo } from "src/utils/tipovi";

@Injectable()
export class JeloService {
  
  constructor(private jeloRepo: JeloRepository) {}

  async dajSvaJela() {
    return this.jeloRepo.dajSvaJela();
  }

  async kreirajJelo(podaci: Omit<NeprosirenoJelo, "id">) {
    return this.jeloRepo.kreirajJelo(podaci);
  }

  async azurirajJelo(podaci: NeprosirenoJelo) {
    return this.jeloRepo.azurirajJelo(podaci);
  }

  async izbrisiJelo(id: number) {
    return this.jeloRepo.izbrisiJelo(id);
  }

  async dajJeloPoId(id: number) {
    const jelo = await this.jeloRepo.dajJeloPoId(id);

    if(!jelo) {
      throw new Error(`Ne postoji jelo sa ovim ID-jem (${id})`);
    }

    return jelo;
  }
}