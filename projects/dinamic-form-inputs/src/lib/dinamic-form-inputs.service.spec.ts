import { TestBed } from '@angular/core/testing';

import { DinamicFormInputsService } from './dinamic-form-inputs.service';

describe('DinamicFormInputsService', () => {
  let service: DinamicFormInputsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DinamicFormInputsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
