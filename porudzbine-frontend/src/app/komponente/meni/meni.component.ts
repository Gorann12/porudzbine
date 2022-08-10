import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { JeloService } from 'src/app/servisi/jelo.service';
import { Jelo } from 'src/app/tipovi';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.scss'],
})
export class MeniComponent implements OnInit {
  jela: Jelo[] = [];
  filtriranaJela: Jelo[] = [];
  ucitavanje = true;

  constructor(private jeloServis: JeloService, private snackBar: MatSnackBar) {}

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

  azuriraj(jelo: Jelo) {
    console.log("JELO", jelo);
  }

  filtriraj(evt: Event) {
    const inputZaFiltriranje = evt.target as HTMLInputElement;
    const vrednost = inputZaFiltriranje.value.toLowerCase();

    if(vrednost === "") {
      this.filtriranaJela = [...this.jela];
    }

    this.filtriranaJela = this.jela.filter(jelo => jelo.naziv.toLowerCase().includes(vrednost))
  }
}
