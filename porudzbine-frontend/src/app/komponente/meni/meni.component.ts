import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { JeloService } from 'src/app/servisi/jelo.service';
import { KorisnikService } from 'src/app/servisi/korisnik.service';
import { Jelo } from 'src/app/tipovi';
import { DialogPotvrdaComponent } from '../deljene/dialog-potvrda/dialog-potvrda.component';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.scss'],
})
export class MeniComponent implements OnInit {
  jela: Jelo[] = [];
  filtriranaJela: Jelo[] = [];
  ucitavanje = true;

  constructor(
    private jeloServis: JeloService,
    private snackBar: MatSnackBar,
    private korisnikService: KorisnikService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.jeloServis
      .dajJela()
      .pipe(
        finalize(() => {
          this.ucitavanje = false;
        })
      )
      .subscribe({
        next: (jela) => {
          this.jela = jela;
          this.filtriranaJela = jela;
        },
        error: (err) => {
          this.snackBar.open(err.message, 'skloni', { duration: 5000 });
        },
      });
  }

  azuriraj(id: number) {
    this.router.navigate(['/jelo', 'azuriraj', id]);
  }

  izbrisi(id: number) {
    const dialogRef = this.dialog.open(DialogPotvrdaComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const backup = [...this.jela];
        this.jeloServis.izbrisiJelo(id).subscribe({
          error: (err) => {
            this.jela = backup;
            this.snackBar.open(err.message, 'skloni', { duration: 5000 })
          }
        })

        this.jela = this.jela.filter(jelo => jelo.id !== id);
        this.filtriranaJela = this.filtriranaJela.filter(jelo => jelo.id !== id);
      }
    });
  }

  daLiJeKorisnikAdmin() {
    return this.korisnikService.daLiKorisnikImaUlogu("ADMIN");
  }

  daLiJeKorisnikUlogovan() {
    return this.korisnikService.daLiKorisnikImaUlogu("KORISNIK");
  }

  filtriraj(evt: Event) {
    const inputZaFiltriranje = evt.target as HTMLInputElement;
    const vrednost = inputZaFiltriranje.value.toLowerCase();

    if (vrednost === '') {
      this.filtriranaJela = [...this.jela];
    }

    this.filtriranaJela = this.jela.filter((jelo) =>
      jelo.naziv.toLowerCase().includes(vrednost)
    );
  }
}
