import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sto } from '../tipovi';

@Injectable({
  providedIn: 'root'
})
export class StoService {
  private rootUrl = `${environment.serverRootUrl}/stolovi`;

  constructor(private http: HttpClient) { }

  dajSveStolove() {
    return this.http.get<Sto[]>(`${this.rootUrl}/`);
  }
}
