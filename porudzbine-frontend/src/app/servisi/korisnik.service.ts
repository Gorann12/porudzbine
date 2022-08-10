import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { AuthResponse, Korisnik, Kredencijali, UlogaKorisnika } from '../tipovi';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {
  private rootUrl = `${environment.serverRootUrl}/korisnici`;
  private ulogovaniKorisnikSub = new BehaviorSubject<Korisnik | null>(null);
  private ulogovaniKorisnik: Korisnik | null = null;

  constructor(private http: HttpClient) { }

  prijaviKorisnika(kredencijali: Kredencijali) {
    return this.http.post<AuthResponse>(`${this.rootUrl}/prijava`, kredencijali).pipe(tap((data) => {
      localStorage.setItem('token', data.token);
      this.ulogovaniKorisnikSub.next(data.korisnik);
      this.ulogovaniKorisnik = data.korisnik;
    }))
  }

  registrujKorisnika(kredencijali: Korisnik) {
    return this.http.post<AuthResponse>(`${this.rootUrl}/registracija`, kredencijali).pipe(tap((data) => {
      localStorage.setItem('token', data.token);
      this.ulogovaniKorisnikSub.next(data.korisnik);
      this.ulogovaniKorisnik = data.korisnik;
    }))
  }

  dajKorisnika() {
    return this.ulogovaniKorisnikSub.asObservable();
  }

  daLiKorisnikImaUlogu(uloga: "ADMIN" | "KORISNIK" | "GOST") {
    if(!this.ulogovaniKorisnik) {
      return uloga === "GOST";
    }

    return this.ulogovaniKorisnik.uloga === uloga;
  }

  inicijalizujKorisnika() {
    return this.http.get<Korisnik | null>(`${this.rootUrl}/ja`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).pipe(tap((data) => {
      if(data !== null) {
        this.ulogovaniKorisnikSub.next(data);
        this.ulogovaniKorisnik = data;
      }
    }))
  }

  odjaviKorisnika() {
    localStorage.removeItem('token');
    this.ulogovaniKorisnik = null;
    this.ulogovaniKorisnikSub.next(null)
  }

  dajToken() {
    return localStorage.getItem('token');
  }
}
