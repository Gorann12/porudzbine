import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { PrijaviKorisnikaDto, RegistrujKorisnikaDto } from "src/controller/dto";
import { UlogaKorisnika } from "src/modeli/korisnik.model";
import { KorisnikService } from "src/service/korisnik.service";

@Controller('/korisnici')
export class KorisnikController {

  constructor(private korisnikService: KorisnikService) {}

  @Post('/prijava')
  async prijaviKorisnika(@Body() kredencijali: PrijaviKorisnikaDto) {
    try {
      return await this.korisnikService.prijaviKorisnika(kredencijali);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('/registracija')
  async registrujKorisnika(@Body() podacioKorisniku: RegistrujKorisnikaDto) {
    try {
      return await this.korisnikService.registrujKorisnika({ ...podacioKorisniku, uloga: UlogaKorisnika.korisnik });
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async dajSveKorisnike() {
    try {
      return await this.korisnikService.dajSveKorisnike();
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }
}