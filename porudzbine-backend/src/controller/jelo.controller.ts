import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JeloService } from 'src/service/jelo.service';
import { AdminGuard, JwtGuard } from 'src/utils/guards';
import { KreirajJeloDto, AzurirajJeloDto } from './dto';

@Controller('/jela')
export class JeloController {
  constructor(private jeloService: JeloService) {}

  @Get()
  async dajSvaJela() {
    try {
      return await this.jeloService.dajSvaJela();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post()
  @UseGuards(JwtGuard, AdminGuard)
  async kreirajJelo(@Body() podaci: KreirajJeloDto) {
    try {
      return await this.jeloService.kreirajJelo(podaci);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Put('/:id')
  @UseGuards(JwtGuard, AdminGuard)
  async azurirajJelo(
    @Param('id', ParseIntPipe) id: number,
    @Body() azurirajJelo: AzurirajJeloDto,
  ) {
    try {
      return await this.jeloService.azurirajJelo({ ...azurirajJelo, id });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete('/:id')
  @UseGuards(JwtGuard, AdminGuard)
  async izbrisiJelo(
    @Param('id', ParseIntPipe) id: number
  ) {
    try {
      return await this.jeloService.izbrisiJelo(id);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }
}
