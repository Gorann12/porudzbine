import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  socketSubskripcija: Subscription;
  niz: Array<string> = [];
  testForma = this.fb.group({
    vreme: ['12:00'],
    opis: ['', [Validators.required, Validators.maxLength(10)]]
  })

  constructor(private fb: FormBuilder, private socket: SocketService) {}

  ngOnInit() {
    // this.socketSubskripcija = this.socket.slusajEvent().subscribe((data: any) => {
    //   this.niz.push(data);
    // })
  }

  // predajVrednost() {
  //   console.log("EMITOVAO");
  //   this.socket.emituj("EMITOVANA VREDNOST SA FORME");
  // }

  predajVrednost() {
    alert(`Uspesno ste ispunili formu: ${this.testForma.value.opis} - ${this.testForma.value.vreme}`)
  }

  ngOnDestroy(): void {
    // this.socketSubskripcija.unsubscribe()
  }
}
