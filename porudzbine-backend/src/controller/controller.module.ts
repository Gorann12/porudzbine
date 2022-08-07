import { Module } from "@nestjs/common";
import { ServiceModule } from "src/service/service.module";
import { KorisnikController } from "./korisnik.controller";

@Module({
  imports: [ServiceModule],
  controllers: [KorisnikController],
})
export class ControllerModule {}