import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { iif, retry, share, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { KorisnikService } from 'src/app/servisi/korisnik.service';
import { PorudzbinaService } from 'src/app/servisi/porudzbina.service';
import { Porudzbina, StatusPorudzbine } from 'src/app/tipovi';

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
          this.snackBar.open(err?.error?.message || err, "skloni", { duration: 5000 });
          this.ucitavanje = false;
        },
      });
  }

  postaviExpandovanId(idPorudzbine: number) {
    this.expandovanId = idPorudzbine;
  }

  daLiJeKorisnikAdmin() {
    return this.korisnikServis.daLiKorisnikImaUlogu("ADMIN");
  }

  promovisiStatusPorudzbine(porudzbina: Porudzbina) {
    let status = porudzbina.status;

    if(porudzbina.status === StatusPorudzbine.primljeno) {
      status = StatusPorudzbine.preuzeto;
    } else if(porudzbina.status === StatusPorudzbine.preuzeto) {
      status = StatusPorudzbine.zavrseno;
    }

    this.porudzbineServis.promeniStatusPorudzbine(porudzbina.id, status).subscribe({
      error: (err) => {
        this.snackBar.open(`Nesto je poslo po zlu pri promeni statusa ${err?.error?.message}!`, 'skloni', { duration: 5000 });
      }
    })

    this.porudzbine = this.porudzbine.map((trenutnaPorudzbina) =>
      trenutnaPorudzbina.id === porudzbina.id ? {
        ...trenutnaPorudzbina,
        status
      } : trenutnaPorudzbina
    );
  }

  dajTekstZaSledeciStatus(status: StatusPorudzbine) {
    if(status === StatusPorudzbine.primljeno) {
      return "Preuzmi";
    } else if(status === StatusPorudzbine.preuzeto) {
      return "Zavrsi";
    } else {
      return "Gotovo"
    }
  }

  dajBojuZaTrenutniStatus(status: StatusPorudzbine) {
    if(status === StatusPorudzbine.primljeno) {
      return "primary";
    } else if(status === StatusPorudzbine.preuzeto) {
      return "accent";
    } else {
      return "warn";
    }
  }

  daLiJeZavrsenaPorudzbina(status: StatusPorudzbine) {
    return status === StatusPorudzbine.zavrseno;
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }
  
}
