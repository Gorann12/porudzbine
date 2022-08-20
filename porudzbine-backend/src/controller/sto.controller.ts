import { BadRequestException, Controller, Get } from "@nestjs/common";
import { StoService } from "src/service/sto.service";

@Controller('/stolovi')
export class StoController {

  constructor(private stoService: StoService) {}

  @Get()
  async dajSveStolove() {
    try {
      return await this.stoService.dajSve();
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }
}