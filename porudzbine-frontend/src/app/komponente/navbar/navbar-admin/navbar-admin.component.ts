import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Korisnik } from 'src/app/tipovi';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['../navbar.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  @Input() korisnik: Korisnik | null;
  @Output() odjava: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  odjaviKorisnika() {
    this.odjava.emit();
  }
}
