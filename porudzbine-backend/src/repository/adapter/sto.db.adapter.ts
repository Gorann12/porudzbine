import { Injectable } from "@nestjs/common";
import { Sto } from "src/modeli/sto.model";
import { StoDbModel } from "../tipovi";

@Injectable()
export class StoDbAdapter {
  
  konvertuj(model: StoDbModel): Sto {
    return model ? {
      id: model.sto_id,
      oznaka: model.sto_oznaka
    } : null;
  }

}