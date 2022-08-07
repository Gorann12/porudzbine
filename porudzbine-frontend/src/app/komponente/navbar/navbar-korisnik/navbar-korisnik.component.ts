import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Korisnik } from 'src/app/tipovi';

@Component({
  selector: 'app-navbar-korisnik',
  templateUrl: './navbar-korisnik.component.html',
  styleUrls: ['../navbar.component.scss']
})
export class NavbarKorisnikComponent implements OnInit {
  @Input() korisnik: Korisnik | null;
  @Output() odjava: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  odjaviKorisnika() {
    this.odjava.emit();
  }
}
