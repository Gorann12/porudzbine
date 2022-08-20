import { Injectable } from "@nestjs/common";
import { StoRepository } from "src/repository/sto.repository";

@Injectable()
export class StoService {
 
  constructor(private stoRepo: StoRepository) {}

  dajSve() {
    return this.stoRepo.dajSveStolove();
  }

}