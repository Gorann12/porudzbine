import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-potvrda',
  templateUrl: './dialog-potvrda.component.html',
  styleUrls: ['./dialog-potvrda.component.scss'],
})
export class DialogPotvrdaComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      akcije: { da: string | undefined; ne: string | undefined };
    }
  ) {}

  ngOnInit(): void {}
}
