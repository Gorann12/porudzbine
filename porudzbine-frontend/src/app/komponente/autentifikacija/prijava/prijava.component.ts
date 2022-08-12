import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { KorisnikService } from 'src/app/servisi/korisnik.service';
import { Kredencijali } from 'src/app/tipovi';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss'],
})
export class PrijavaComponent implements OnInit {
  ucitavanje = false;
  formaZaPrijavu = this.fb.group({
    email: ['', Validators.required],
    sifra: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private korisnikServis: KorisnikService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  prijaviKorisnika() {
    if (this.formaZaPrijavu.invalid) {
      return;
    }
    this.ucitavanje = true;
    this.korisnikServis
      .prijaviKorisnika(this.formaZaPrijavu.value as Kredencijali).pipe(finalize(() => {
        this.ucitavanje = false;
      }))
      .subscribe({
        complete: () => {
          this.router.navigate(['/']);
        },
        error: (e) => {
          const poruka = e?.error?.message;
          this.snackBar.open(Array.isArray(poruka) ? poruka.join(',') : poruka, 'skloni', { duration: 5000 });
        },
      });
  }

  get email() {
    return this.formaZaPrijavu.controls.email;
  }

  get sifra() {
    return this.formaZaPrijavu.controls.sifra;
  }
}
