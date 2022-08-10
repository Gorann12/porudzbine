import { Injectable } from "@nestjs/common";
import { Kategorija } from "src/modeli/kategorija.model";
import { KategorijaDbModel } from "../tipovi";

@Injectable()
export class KategorijaDbAdapter {

  konvertuj(model: KategorijaDbModel): Kategorija {
    return model ? {
      id: model.kategorija_id,
      naziv: model.kategorija_naziv,
      opis: model.kategorija_opis,
      rok: model.kategorija_rok
    } : null;
  }
}