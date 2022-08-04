import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  niz: Array<string> = [];
  testForma = this.fb.group({
    vreme: ['12:00'],
    opis: ['', [Validators.required, Validators.maxLength(10)]]
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

  }

  predajVrednost() {
    alert(`Uspesno ste ispunili formu: ${this.testForma.value.opis} - ${this.testForma.value.vreme}`)
  }
}
