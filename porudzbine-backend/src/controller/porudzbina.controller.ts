import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { PorudzbinaService } from "src/service/porudzbina.service";
import { DajKorisnika } from "src/utils/decorators";
import { AdminGuard, JwtGuard } from "src/utils/guards";
import { KreirajPorudzbinuDto, PromeniStatusDto } from "./dto";

@Controller('/porudzbine')
export class PorudzbinaController {
  
  constructor(private porudzbinaServis: PorudzbinaService) {}

  @Get() 
  @UseGuards(JwtGuard, AdminGuard)
  async dajSvePorudzbine() {
    try {
      return await this.porudzbinaServis.dajSvePorudzbine();
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('/korisnik')
  @UseGuards(JwtGuard)
  async dajSvePorudzbineZaKorisnika(@DajKorisnika('id', ParseIntPipe) id: number) {
    try {
      return await this.porudzbinaServis.dajSveZaKorisnika(id);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post()
  @UseGuards(JwtGuard)
  async poruci(@DajKorisnika('id', ParseIntPipe) idKorisnika, @Body() podaci: KreirajPorudzbinuDto) {
    try {
      return await this.porudzbinaServis.poruci(idKorisnika, podaci);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }

  @Patch('/:id')
  @UseGuards(JwtGuard, AdminGuard)
  async promeniStatusPorudzbine(@Param('id', ParseIntPipe) idPorudzbine: number, @Body() status: PromeniStatusDto) {
    try {
      return await this.porudzbinaServis.promeniStatus(idPorudzbine, status);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }
}