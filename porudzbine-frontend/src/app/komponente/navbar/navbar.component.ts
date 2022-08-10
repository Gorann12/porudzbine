import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private korisnikServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.supskripcija = this.korisnikServis.dajKorisnika().subscribe({
      next: (data) => {
        this.korisnik = data;
      }
    })
  }

  daLiKorisnikImaUlogu(uloga: "GOST" | "ADMIN" | "KORISNIK") {
    return this.korisnikServis.daLiKorisnikImaUlogu(uloga);
  }

  odjaviKorisnika() {
    this.korisnikServis.odjaviKorisnika();
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.supskripcija.unsubscribe();
  }
}
