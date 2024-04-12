import { TestBed } from '@angular/core/testing';

import { HistoryemployeeService } from './historyemployee.service';

describe('HistoryemployeeService', () => {
  let service: HistoryemployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryemployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
