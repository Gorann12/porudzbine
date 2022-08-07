import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KorisnikService } from 'src/app/servisi/korisnik.service';
import { Korisnik } from 'src/app/tipovi';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private supskripcija: Subscription;
  korisnik: Korisnik | null;

  constructor(private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    this.supskripcija = this.korisnikServis.dajKorisnika().subscribe({
      next: (data) => {
        console.log("FROM NAVBAR WITH LOVE", data);
        this.korisnik = data;
      }
    })
  }

  daLiKorisnikImaUlogu(uloga: "GOST" | "ADMIN" | "KORISNIK") {
    return this.korisnikServis.daLiKorisnikImaUlogu(uloga);
  }

  odjaviKorisnika() {
    this.korisnikServis.odjaviKorisnika();
  }

  ngOnDestroy(): void {
    this.supskripcija.unsubscribe();
  }
}
