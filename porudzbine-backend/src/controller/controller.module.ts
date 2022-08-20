import { Module } from "@nestjs/common";
import { ServiceModule } from "src/service/service.module";
import { JeloController } from "./jelo.controller";
import { KategorijaController } from "./kategorija.controller";
import { KorisnikController } from "./korisnik.controller";
import { PorudzbinaController } from "./porudzbina.controller";
import { StoController } from "./sto.controller";

@Module({
  imports: [ServiceModule],
  controllers: [
    KorisnikController,
    JeloController,
    KategorijaController,
    PorudzbinaController,
    StoController
  ],
})
export class ControllerModule {}