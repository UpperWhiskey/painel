import { TestBed, inject } from '@angular/core/testing';

import { MonitorHomeService } from './monitor-home.service';

describe('MonitorHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorHomeService]
    });
  });

  it('should be created', inject([MonitorHomeService], (service: MonitorHomeService) => {
    expect(service).toBeTruthy();
  }));
});
