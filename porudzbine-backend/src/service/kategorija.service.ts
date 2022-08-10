import { Injectable } from "@nestjs/common";
import { KategorijaRepository } from "src/repository/kategorija.repository";

@Injectable()
export class KategorijaService {
  constructor(private kategorijaRepo: KategorijaRepository) {}
  
  async dajSveKategorije() {
    return this.kategorijaRepo.dajSveKategorije();
  }
}