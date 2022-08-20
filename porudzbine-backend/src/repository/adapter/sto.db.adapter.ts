import { Injectable } from "@nestjs/common";
import { Sto } from "src/modeli/sto.model";
import { StoDbModel } from "../tipovi";

@Injectable()
export class StoDbAdapter {
  
  konvertuj(model: StoDbModel): Sto {
    return model ? {
      oznaka: model.sto_oznaka
    } : null;
  }

}