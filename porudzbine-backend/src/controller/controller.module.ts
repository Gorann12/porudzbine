import { Module } from "@nestjs/common";
import { ServiceModule } from "src/service/service.module";
import { JeloController } from "./jelo.controller";
import { KorisnikController } from "./korisnik.controller";

@Module({
  imports: [ServiceModule],
  controllers: [KorisnikController, JeloController],
})
export class ControllerModule {}