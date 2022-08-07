import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { KorisnikService } from 'src/app/servisi/korisnik.service';
import { Korisnik } from 'src/app/tipovi';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss'],
})
export class RegistracijaComponent implements OnInit {
  ucitavanje = false;
  formaZaRegistraciju = this.fb.group({
    ime: [
      '',
      [Validators.minLength(5), Validators.maxLength(50), Validators.required],
    ],
    email: ['', [Validators.email, Validators.required]],
    sifra: [
      '',
      [Validators.minLength(8), Validators.maxLength(50), Validators.required],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private korisnikServis: KorisnikService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registrujKorisnika() {
    if (this.formaZaRegistraciju.invalid) {
      return;
    }

    this.ucitavanje = true;
    this.korisnikServis
      .registrujKorisnika(this.formaZaRegistraciju.value as Korisnik)
      .pipe(finalize(() => {
        this.ucitavanje = false;
      }))
      .subscribe({
        complete: () => {
          this.router.navigate(['/']);
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

  get ime() {
    return this.formaZaRegistraciju.controls.ime;
  }

  get email() {
    return this.formaZaRegistraciju.controls.email;
  }

  get sifra() {
    return this.formaZaRegistraciju.controls.sifra;
  }
}
