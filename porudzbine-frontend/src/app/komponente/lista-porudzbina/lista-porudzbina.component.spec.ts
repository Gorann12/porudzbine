import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPorudzbinaComponent } from './lista-porudzbina.component';

describe('ListaPorudzbinaComponent', () => {
  let component: ListaPorudzbinaComponent;
  let fixture: ComponentFixture<ListaPorudzbinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPorudzbinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPorudzbinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
