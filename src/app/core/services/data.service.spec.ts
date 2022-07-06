import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {AppModule} from "../../app.module";

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
