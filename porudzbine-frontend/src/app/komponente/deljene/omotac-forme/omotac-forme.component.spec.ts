import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OmotacFormeComponent } from './omotac-forme.component';

describe('OmotacFormeComponent', () => {
  let component: OmotacFormeComponent;
  let fixture: ComponentFixture<OmotacFormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OmotacFormeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OmotacFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
