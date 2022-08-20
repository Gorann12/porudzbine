import { Injectable } from "@nestjs/common";
import { Jelo } from "src/modeli/jelo.model";
import { JeloDbModel } from "../tipovi";

@Injectable()
export class JeloDbAdapter {
  
  konvertuj(model: JeloDbModel): Jelo {
    return model ? {
      id: model.jelo_id,
      cena: parseFloat(model.jelo_cena),
      naziv: model.jelo_naziv,
      porcija: model.jelo_porcija,
      sastojci: model.jelo_sastojci,
      kategorija: {
        id: model.kategorija_id,
        naziv: model.kategorija_naziv,
        opis: model.kategorija_opis,
        rok: model.kategorija_rok
      }
    } : null;
  }

}