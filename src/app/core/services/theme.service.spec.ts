import {TestBed} from '@angular/core/testing';

import {ThemeService} from './theme.service';
import {AppModule} from "../../app.module";

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have Behaviour Subject isThemeDark with initial value false', () => {
    expect(service.isThemeDark.value).toBeFalsy();
  });
});
