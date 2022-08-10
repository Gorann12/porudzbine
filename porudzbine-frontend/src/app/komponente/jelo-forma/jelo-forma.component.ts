import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { JeloService } from 'src/app/servisi/jelo.service';
import { KategorijaService } from 'src/app/servisi/kategorija.service';
import { Jelo, Kategorija, NeprosirenoJelo } from 'src/app/tipovi';

@Component({
  selector: 'app-jelo-forma',
  templateUrl: './jelo-forma.component.html',
  styleUrls: ['./jelo-forma.component.scss'],
})
export class JeloFormaComponent implements OnInit {
  forma = this.fb.group({
    naziv: ['', [Validators.required, Validators.maxLength(50)]],
    sastojci: ['', [Validators.required, Validators.maxLength(100)]],
    porcija: ['', [Validators.maxLength(100)]],
    cena: [1, [Validators.required, Validators.min(1)]],
    kategorijaId: ['', [Validators.required]],
  });
  kategorije: Kategorija[] = [];
  ucitavanje = true;
  idJela: number | null = null;

  constructor(
    private fb: FormBuilder,
    private kategorijaServis: KategorijaService,
    private snackBar: MatSnackBar,
    private jeloServis: JeloService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.idJela = id !== null ? +id : id;

    const sources =
      id !== null
        ? [
            this.kategorijaServis.dajSveKategorije(),
            this.jeloServis.dajJeloPoId(this.idJela as number),
          ]
        : [this.kategorijaServis.dajSveKategorije()];

    const finalObservable = forkJoin(sources);

    finalObservable.pipe(finalize(() => {
      this.ucitavanje = false;
    })).subscribe({
      next: (vrednost) => {
        const kategorije = vrednost[0] as Kategorija[];
        this.kategorije = kategorije;
        
        if(vrednost.length === 2) {
          const jelo = vrednost[1] as Jelo;
          this.forma.setValue({
            cena: +jelo.cena,
            kategorijaId: jelo.kategorija.id.toString(),
            naziv: jelo.naziv,
            porcija: jelo.porcija,
            sastojci: jelo.sastojci
          });
        }
      },
      error: (e) => {
        const poruka = e.error.message || '';
        this.snackBar.open(Array.isArray(poruka) ? poruka.join(', ') : poruka, 'skloni', { duration: 5000 })
      }
    })
  }

  upsertJelo() {
    if (this.forma.invalid) {
      return;
    }

    const idKategorije = parseInt(this.kategorijaId.value || '');

    if (Number.isNaN(idKategorije)) {
      alert('Nesto je poslo po zlu pri izboru kategorije!');
      return;
    }

    const vrednost = {
      ...this.forma.value,
      kategorijaId: idKategorije,
    } as Omit<NeprosirenoJelo, 'id'>;

    this.ucitavanje = true;
    const observable =
      this.idJela !== null
        ? this.jeloServis.azurirajJelo(this.idJela, vrednost)
        : this.jeloServis.kreirajJelo(vrednost);

    observable.pipe(
      finalize(() => {
        this.ucitavanje = false;
      })
    )
    .subscribe({
      next: () => {
        const daLiJeEditMod = this.idJela !== null;

        if(!daLiJeEditMod) {
          this.snackBar.open('Uspesno ste kreirali jelo!', 'skloni', { duration: 3000 });
          this.forma.reset();
        } else {
          this.router.navigate(['']);
        }
      },
      error: (e) => {
        const poruka = e.error.message;
        this.snackBar.open(
          Array.isArray(poruka) ? poruka.join(',') : poruka,
          'skloni',
          { duration: 5000 }
        );
      },
    });
  }

  get naziv() {
    return this.forma.controls.naziv;
  }

  get sastojci() {
    return this.forma.controls.sastojci;
  }

  get porcija() {
    return this.forma.controls.porcija;
  }

  get cena() {
    return this.forma.controls.cena;
  }

  get kategorijaId() {
    return this.forma.controls.kategorijaId;
  }
}
