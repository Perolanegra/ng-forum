import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicFormInputsComponent } from './dinamic-form-inputs.component';

describe('DinamicFormInputsComponent', () => {
  let component: DinamicFormInputsComponent;
  let fixture: ComponentFixture<DinamicFormInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinamicFormInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicFormInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
