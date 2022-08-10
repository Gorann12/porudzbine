import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Jelo } from '../tipovi';

@Injectable({
  providedIn: 'root'
})
export class JeloService {
  private rootUrl = `${environment.serverRootUrl}/jela` 

  constructor(private http: HttpClient) { }

  dajJela() {
    return this.http.get<Jelo[]>(`${this.rootUrl}/`);
  }
}
