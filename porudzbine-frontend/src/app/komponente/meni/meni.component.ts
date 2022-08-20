import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { JeloService } from 'src/app/servisi/jelo.service';
import { KorisnikService } from 'src/app/servisi/korisnik.service';
import { PorudzbinaService } from 'src/app/servisi/porudzbina.service';
import { Jelo } from 'src/app/tipovi';
import { DialogInputComponent } from '../deljene/dialog-input/dialog-input.component';
import { DialogPotvrdaComponent } from '../deljene/dialog-potvrda/dialog-potvrda.component';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.scss'],
})
export class MeniComponent implements OnInit {
  jela: Jelo[] = [];
  filtriranaJela: Jelo[] = [];
  selektovanaJela: Jelo[] = [];
  ukupnaCenaSelektovanihJela = 0;
  ucitavanje = true;

  constructor(
    private jeloServis: JeloService,
    private snackBar: MatSnackBar,
    private korisnikService: KorisnikService,
    private router: Router,
    private dialog: MatDialog,
    private porudzbinaService: PorudzbinaService
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
          this.snackBar.open(err?.error?.message, 'skloni', { duration: 5000 });
        },
      });
  }

  azuriraj(id: number) {
    this.router.navigate(['/jelo', 'azuriraj', id]);
  }

  izbrisi(id: number) {
    const dialogRef = this.dialog.open(DialogPotvrdaComponent, {
      data: {
        title: "Brisanje jela",
        content: "Da li ste sigurni da zelite da obrisete jelo?",
        akcije: {
          da: 'Da',
          ne: 'Ne'
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const backup = [...this.jela];
        this.jeloServis.izbrisiJelo(id).subscribe({
          error: (err) => {
            this.jela = backup;
            this.snackBar.open(err?.error?.message, 'skloni', { duration: 5000 })
          }
        })

        this.jela = this.jela.filter(jelo => jelo.id !== id);
        this.filtriranaJela = this.filtriranaJela.filter(jelo => jelo.id !== id);
      }
    });
  }

  naruci() {
    const dialogRef = this.dialog.open(DialogInputComponent);

    dialogRef.afterClosed().subscribe(napomena => {
      if(napomena !== undefined) {
        this.ucitavanje = true;
        this.porudzbinaService.naruci({
          napomena,
          jela: this.selektovanaJela.map(selektovanoJelo => selektovanoJelo.id)
        }).pipe(finalize(() => {
          this.ucitavanje = false;
        })).subscribe({
          next: () => {
            this.snackBar.open("Uspesno ste narucili!", "skloni", { duration: 5000 });
            this.postaviSelektovanaJela([]);
          },
          error: (err) => {
            this.snackBar.open(err?.error?.message || err, "skloni", { duration: 5000 });
          }
        })
      } 
    })
  }

  private parsirajVreme(vreme: number) {
    return vreme.toString().padStart(2, '0');
  }

  daLiJeIstekaoRokZaNarucivanje(rok: string | null) {
    if(!rok) {
      return false;
    }

    const datum = new Date();
    const trenutnoVreme = `${this.parsirajVreme(
      datum.getHours()
    )}:${this.parsirajVreme(datum.getMinutes())}:${this.parsirajVreme(
      datum.getSeconds()
    )}`;
    const neutralniDatum = '1/1/1999';

    return Date.parse(`${neutralniDatum} ${trenutnoVreme}`) > Date.parse(`${neutralniDatum} ${rok}`);
  }

  daLiJeKorisnikAdmin() {
    return this.korisnikService.daLiKorisnikImaUlogu("ADMIN");
  }

  daLiJeKorisnikUlogovan() {
    return this.korisnikService.daLiKorisnikImaUlogu("KORISNIK");
  }

  daLiJeGost() {
    return this.korisnikService.daLiKorisnikImaUlogu("GOST");
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

  selektujJelo(event: MouseEvent, jelo: Jelo) {
    event.preventDefault();
    if(!this.daLiJeJeloVecSelektovano(jelo.id)) {
      if(this.daLiJeIstekaoRokZaNarucivanje(jelo.kategorija.rok)) {
        this.dialog.open(DialogPotvrdaComponent, {
          data: {
            title: "Nazalost ne mozete naruciti ovo jelo",
            content: `Prosao je rok za narucivanje ovog jela (${jelo.kategorija.rok})`,
            akcije: {
              da: 'OK',
            }
          }
        });

        return;
      }

      this.postaviSelektovanaJela([...this.selektovanaJela, jelo]);
    } else {
      const jelaBezTrenutnoUklonjenogJela = this.selektovanaJela.filter(selektovanoJelo => selektovanoJelo.id !== jelo.id);
      this.postaviSelektovanaJela(jelaBezTrenutnoUklonjenogJela);
    }
  }

  postaviSelektovanaJela(jela: Jelo[]) {
    this.selektovanaJela = jela;
    this.ukupnaCenaSelektovanihJela = this.selektovanaJela.reduce((ukupnaCena, jelo) => ukupnaCena + jelo.cena, 0);
  }

  daLiJeJeloVecSelektovano(idJela: number) {
    return !!this.selektovanaJela.find(jelo => jelo.id === idJela);
  }
}
