import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent implements OnInit {
  formaZaRegistraciju = this.fb.group({
    ime: ['', [Validators.minLength(5), Validators.maxLength(50), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    sifra: ['', [Validators.minLength(8), Validators.maxLength(50), Validators.required]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  registrujKorisnika() {
    console.log("forma", this.formaZaRegistraciju.controls.ime.errors);
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
