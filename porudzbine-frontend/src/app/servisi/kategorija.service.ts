import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Kategorija } from '../tipovi';

@Injectable({
  providedIn: 'root'
})
export class KategorijaService {
  private rootUrl = `${environment.serverRootUrl}/kategorije`;

  constructor(private http: HttpClient) { }

  dajSveKategorije() {
    return this.http.get<Kategorija[]>(`${this.rootUrl}/`);
  }
}
