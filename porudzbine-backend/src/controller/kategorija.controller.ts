import { BadRequestException, Controller, Get } from "@nestjs/common";
import { KategorijaService } from "src/service/kategorija.service";

@Controller('/kategorije')
export class KategorijaController {
  
  constructor(private kategorijaService: KategorijaService) {}

  @Get()
  async dajSveKategorije() {
    try {
      return await this.kategorijaService.dajSveKategorije();
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }
}