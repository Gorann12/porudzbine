import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { StoService } from 'src/app/servisi/sto.service';
import { Sto } from 'src/app/tipovi';

@Component({
  selector: 'app-dialog-input',
  templateUrl: './dialog-input.component.html',
  styleUrls: ['./dialog-input.component.scss']
})
export class DialogInputComponent implements OnInit {
  ucitavanje = true;
  formaZaPorucivanje = this.fb.group({
    napomena: '',
    stoId: ['', Validators.required]
  })
  napomena: string | null = null;
  stolovi: Sto[] = [];
  error: any = null;

  constructor(private stoServis: StoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.stoServis.dajSveStolove().pipe(finalize(() => {
      this.ucitavanje = false;
    })).subscribe({
      next: (preuzetiStolovi) => {
        this.stolovi = preuzetiStolovi;
      },
      error: (err) => {
        this.error = err;
      }
    })
  }

  get stoId() {
    return this.formaZaPorucivanje.controls.stoId;
  }
}
