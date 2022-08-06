import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {
  formaZaPrijavu = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    sifra: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  prijaviKorisnika() {
    console.log("forma", this.formaZaPrijavu.value);
  }

  get email() {
    return this.formaZaPrijavu.controls.email;
  }

  get sifra() {
    return this.formaZaPrijavu.controls.sifra;
  }
}
