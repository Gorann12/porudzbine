import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iif, retry, share, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { KorisnikService } from 'src/app/servisi/korisnik.service';
import { PorudzbinaService } from 'src/app/servisi/porudzbina.service';
import { Porudzbina } from 'src/app/tipovi';

@Component({
  selector: 'app-lista-porudzbina',
  templateUrl: './lista-porudzbina.component.html',
  styleUrls: ['./lista-porudzbina.component.scss'],
})
export class ListaPorudzbinaComponent implements OnInit, OnDestroy {
  private stopPolling = new Subject<void>();
  expandovanId: number = -1;
  ucitavanje: boolean = true;
  porudzbine: Porudzbina[] = [];

  constructor(
    private porudzbineServis: PorudzbinaService,
    private korisnikServis: KorisnikService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    timer(1, 20000)
      .pipe(
        switchMap(() =>
          iif(
            () => this.korisnikServis.daLiKorisnikImaUlogu('ADMIN'),
            this.porudzbineServis.dajSvePorudzbine(),
            this.porudzbineServis.dajSvePorudzbineZaKorisnika()
          )
        ),
        retry(),
        share(),
        takeUntil(this.stopPolling)
      )
      .subscribe({
        next: (porudzbine: Porudzbina[]) => {
          this.porudzbine = porudzbine;
          this.ucitavanje = false;
        },
        error: (err) => {
          this.snackBar.open(err.message || err, "skloni", { duration: 5000 });
          this.ucitavanje = false;
        },
      });
  }

  postaviExpandovanId(idPorudzbine: number) {
    this.expandovanId = idPorudzbine;
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }
}
