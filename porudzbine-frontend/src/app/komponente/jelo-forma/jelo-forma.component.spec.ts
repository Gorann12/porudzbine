import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeloFormaComponent } from './jelo-forma.component';

describe('JeloFormaComponent', () => {
  let component: JeloFormaComponent;
  let fixture: ComponentFixture<JeloFormaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeloFormaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeloFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
