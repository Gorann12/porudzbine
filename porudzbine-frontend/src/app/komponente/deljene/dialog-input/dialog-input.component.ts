import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-input',
  templateUrl: './dialog-input.component.html',
  styleUrls: ['./dialog-input.component.scss']
})
export class DialogInputComponent implements OnInit {
  opis: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
