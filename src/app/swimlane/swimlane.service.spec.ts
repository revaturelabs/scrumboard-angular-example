import { TestBed, inject } from '@angular/core/testing';

import { SwimlaneService } from './swimlane.service';

describe('SwimlaneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwimlaneService]
    });
  });

  it('should be created', inject([SwimlaneService], (service: SwimlaneService) => {
    expect(service).toBeTruthy();
  }));
});
