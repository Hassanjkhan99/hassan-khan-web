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
  it('should have field totalCount with initial value 0', () => {
    const field = service.totalCount;
    expect(field).toBeDefined();
    expect(field).toEqual(0);
  });

  it('should have field currentPage with initial value 0', () => {
    const field = service.currentPage;
    expect(field).toBeDefined();
    expect(field).toEqual(0);
  });

  it('should have field currentSearch with initial value ""', () => {
    const field = service.currentSearch;
    expect(field).toBeDefined();
    expect(field).toEqual("");
  });

  it('should have field currentSort with initial value ""', () => {
    const field = service.currentSort;
    expect(field).toBeDefined();
    expect(field).toEqual("");
  });

  it('should have field currentOrder with initial value ""', () => {
    const field = service.currentOrder;
    expect(field).toBeDefined();
    expect(field).toEqual("");
  });

  it('should have field isRateLimitReached with initial value ""', () => {
    const field = service.isRateLimitReached;
    expect(field).toBeDefined();
    expect(field).toBeFalsy();
  });

  it('should have field isLoadingResults with initial value ""', () => {
    const field = service.isLoadingResults;
    expect(field).toBeDefined();
    expect(field).toBeFalsy();
  });

  it('should have field noRecords with initial value ""', () => {
    const field = service.noRecords;
    expect(field).toBeDefined();
    expect(field).toBeTruthy();
  });

  it('should have Behaviour Subject field isShowAvatarImage with initial value false', () => {
    const field = service.isShowAvatarImage;
    expect(field).toBeDefined();
    expect(field.value).toBeFalsy();
  });
});
