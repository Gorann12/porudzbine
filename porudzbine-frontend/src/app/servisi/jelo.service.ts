import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Jelo, NeprosirenoJelo } from '../tipovi';
import { KorisnikService } from './korisnik.service';

@Injectable({
  providedIn: 'root'
})
export class JeloService {
  private rootUrl = `${environment.serverRootUrl}/jela` 

  constructor(private http: HttpClient, private korisnikServis: KorisnikService) { }

  dajJela() {
    return this.http.get<Jelo[]>(`${this.rootUrl}/`);
  }

  kreirajJelo(jelo: Omit<NeprosirenoJelo, 'id'>) {
    const token = this.korisnikServis.dajToken();

    return this.http.post(`${this.rootUrl}/`, jelo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  dajJeloPoId(id: number) {
    return this.http.get(`${this.rootUrl}/${id}`);
  }
}
