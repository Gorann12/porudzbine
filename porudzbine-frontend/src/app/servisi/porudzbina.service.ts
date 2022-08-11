import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Porudzbina } from '../tipovi';
import { KorisnikService } from './korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class PorudzbinaService {
  private rootUrl = `${environment.serverRootUrl}/porudzbine`;

  constructor(private http: HttpClient, private korisnikService: KorisnikService) { }

  naruci(podaci: { opis: string | null, jela: number[] }) {
    const token = this.korisnikService.dajToken();
    
    return this.http.post(`${this.rootUrl}/`, podaci, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  dajSvePorudzbine() {
    const token = this.korisnikService.dajToken();

    return this.http.get<Porudzbina[]>(`${this.rootUrl}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  dajSvePorudzbineZaKorisnika() {
    const token = this.korisnikService.dajToken();

    return this.http.get<Porudzbina[]>(`${this.rootUrl}/korisnik`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}