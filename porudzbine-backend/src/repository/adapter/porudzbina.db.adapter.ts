import { Injectable } from "@nestjs/common";
import { Jelo } from "src/modeli/jelo.model";
import { Porudzbina } from "src/modeli/porudzbina.model";
import { Sto } from "src/modeli/sto.model";
import { PorudzbinaDbModel } from "../tipovi";

@Injectable()
export class PorudzbinaDbAdapter {
  
  constructor() {}

  konvertuj(nizDbModela: PorudzbinaDbModel[] = []): Porudzbina[] { 
    let porudzbine: Porudzbina[] = [];

    nizDbModela.forEach(dbModel => {
      const porudzbina: Porudzbina = {
        ...this.dajPodatkeOPorudzbini(dbModel) as Omit<Porudzbina, 'korisnik' | 'jela'>,
        ...this.dajPodatkeOKorisniku(dbModel) as Pick<Porudzbina, 'korisnik'>,
        ...this.dajPodatkeOStolu(dbModel) as Pick<Porudzbina, 'sto'>,
        jela: [this.dajPodatkeOJelu(dbModel) as Pick<Jelo, 'cena' | 'naziv'>]
      };

      porudzbine.push(porudzbina);
    })

    const mapaPorudzbina: { [key: string]: Porudzbina } = porudzbine.reduce((mapaPorudzbina, trenutnaPorudzbina) => {
      const kljuc = trenutnaPorudzbina.id.toString();
      let mapiranaPorudzbina = mapaPorudzbina[kljuc];
      
      if(mapiranaPorudzbina) {
        mapiranaPorudzbina = { ...mapiranaPorudzbina, jela: [ ...mapiranaPorudzbina.jela, ...trenutnaPorudzbina.jela] }

        return { ...mapaPorudzbina, [kljuc]: mapiranaPorudzbina }
      }

      return { ...mapaPorudzbina, [kljuc]: trenutnaPorudzbina };
    }, {})

    return Object.keys(mapaPorudzbina).map(kljuc => mapaPorudzbina[kljuc]);
  }

  private dajPodatkeOStolu(model: PorudzbinaDbModel): Pick<Porudzbina, "sto"> {
    return {
      sto: {
        oznaka: model.sto_oznaka
      }
    }
  }

  private dajPodatkeOPorudzbini(model: PorudzbinaDbModel): Omit<Porudzbina, 'korisnik' | 'jela' | 'sto'> {
    return {
      id: model.porudzbina_id,
      kreirana: model.porudzbina_kreirana,
      napomena: model.porudzbina_napomena,
      status: model.porudzbina_status,
      ukupanIznos: parseFloat(model.porudzbina_ukupan_iznos)
    }
  }

  private dajPodatkeOKorisniku(model: PorudzbinaDbModel): Pick<Porudzbina, 'korisnik'> {
    return {
      korisnik: {
        id: model.korisnik_id,
        email: model.korisnik_email,
        ime: model.korisnik_ime,
        uloga: model.korisnik_uloga
      }
    }
  }

  private dajPodatkeOJelu(model: PorudzbinaDbModel): Pick<Jelo, 'cena' | 'naziv'> {
    return {
      cena: model.pj_jelo_cena,
      naziv: model.pj_jelo_naziv
    }
  }
}