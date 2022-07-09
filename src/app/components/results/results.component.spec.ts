import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultsComponent} from '@components/*';
import {AppModule} from "../../app.module";
import {dataCySelector} from "@helpers/*";
import {Order, Page, Sort} from "@enums/*";
import {PageEvent} from "@angular/material/paginator";

const selectors = {
  main: dataCySelector('results__main'),
  table: dataCySelector('results__table'),
  avatar: dataCySelector('results__column-avatar'),
  avatar_url: dataCySelector('results__column-url'),
  login: dataCySelector('results__login'),
  type: dataCySelector('results__type'),
  loading: dataCySelector('results__loading-shade'),
  spinner: dataCySelector('results__spinner'),
  limit: dataCySelector('results__limit'),
  noRecord: dataCySelector('results__no-record'),
  paginator: dataCySelector('results__paginator'),
}

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ResultsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Template', () => {
    it('should have a main div with classes  " m-1  mat-elevation-z8"', () => {
      const ele = compiled.querySelector(selectors.main)
      expect(ele).toBeTruthy();
      expect(ele).toHaveClass('m-1')
      expect(ele).toHaveClass('mat-elevation-z8')
    });
    it('should have a main div with children mat-table ,loading-shade and pagination"', () => {
      const table = compiled.querySelector(selectors.main)?.querySelector(selectors.table);
      const loading = compiled.querySelector(selectors.main)?.querySelector(selectors.loading);
      const paginator = compiled.querySelector(selectors.main)?.querySelector(selectors.paginator);
      expect(table).toBeTruthy();
      expect(loading).toBeTruthy();
      expect(paginator).toBeTruthy();
    });
    it('should have a mat table with all attributes"', () => {
      const tableAttributes = compiled.querySelector(selectors.main)?.querySelector(selectors.table)?.getAttributeNames()
      expect(tableAttributes).toContain('matsortactive');
      expect(tableAttributes).toContain('matsortdirection');
      expect(tableAttributes).toContain('matsortdisableclear');
      expect(tableAttributes).toContain('matsort');

    });
    it('should have a mat table with matsortactive attribute = login', () => {
      const tableAttributes = compiled.querySelector(selectors.main)?.querySelector(selectors.table)?.getAttribute('matsortactive')
      expect(tableAttributes).toEqual('login');

    });
    it('should have a mat table with matsortdirection attribute = asc', () => {
      const tableAttributes = compiled.querySelector(selectors.main)?.querySelector(selectors.table)?.getAttribute('matsortdirection')
      expect(tableAttributes).toEqual('asc');

    });

    it('should have a mat table with 4 columns', () => {
      component.dataService.isShowAvatarImage.next(true)
      fixture.detectChanges()
      const tableChildren = compiled.querySelector(selectors.main)?.querySelector(selectors.table)?.childNodes
      expect(tableChildren?.length).toEqual(5);
    });

    it('should have a loading shade which only appears when dataService.isLoadingResults is truthy or dataService.isRateLimitReached is truthy or dataService.noRecords is truthy', () => {
      component.dataService.isLoadingResults = true;
      component.dataService.isRateLimitReached = true;
      component.dataService.noRecords = true
      fixture.detectChanges()
      const loadingShade = compiled.querySelector(selectors.loading)
      expect(loadingShade).toBeTruthy();
      component.dataService.isLoadingResults = false;
      component.dataService.isRateLimitReached = true;
      component.dataService.noRecords = true
      fixture.detectChanges()
      expect(loadingShade).toBeTruthy();
      component.dataService.isLoadingResults = false;
      component.dataService.isRateLimitReached = false;
      component.dataService.noRecords = true
      fixture.detectChanges()
      expect(loadingShade).toBeTruthy();
      component.dataService.isLoadingResults = false;
      component.dataService.isRateLimitReached = true;
      component.dataService.noRecords = false
      fixture.detectChanges()
      expect(loadingShade).toBeTruthy();
      component.dataService.isLoadingResults = true;
      component.dataService.isRateLimitReached = false;
      component.dataService.noRecords = false
      fixture.detectChanges()
      expect(loadingShade).toBeTruthy();
    });

    it('should have a loading shade which should not appears  when dataService.isLoadingResults is falsy and dataService.isRateLimitReached is falsy and dataService.noRecords is falsy', () => {
      component.dataService.isLoadingResults = false;
      component.dataService.isRateLimitReached = false;
      component.dataService.noRecords = false
      fixture.detectChanges()
      const loadingShade = compiled.querySelector(selectors.loading)
      expect(loadingShade).toBeFalsy();
    });
    it('should have a spinner which only appears when dataService.isLoadingResults is truthy and dataService.isRateLimitReached is falsy and dataService.noRecords is falsy', () => {
      component.dataService.isLoadingResults = true;
      component.dataService.isRateLimitReached = false;
      component.dataService.noRecords = false
      fixture.detectChanges()
      const spinner = compiled.querySelector(selectors.spinner)
      expect(spinner).toBeTruthy();
    });

    it('should have a spinner which dont appear when dataService.isLoadingResults is false or dataService.isRateLimitReached is truthy or dataService.noRecords is truthy', () => {
      component.dataService.isLoadingResults = false;
      component.dataService.isRateLimitReached = false;
      component.dataService.noRecords = false
      fixture.detectChanges()
      const spinner = compiled.querySelector(selectors.spinner)
      expect(spinner).toBeFalsy();
      component.dataService.isLoadingResults = false;
      component.dataService.isRateLimitReached = true;
      component.dataService.noRecords = false
      fixture.detectChanges()
      expect(spinner).toBeFalsy();
      component.dataService.isRateLimitReached = true;
      component.dataService.noRecords = true
      fixture.detectChanges()
      expect(spinner).toBeFalsy();
      component.dataService.isRateLimitReached = false;
      component.dataService.noRecords = true
      fixture.detectChanges()
      expect(spinner).toBeFalsy();
    });

    it('should have a limit text which only appears when dataService.isLoadingResults is falsy and dataService.isRateLimitReached is truthy and dataService.noRecords is falsy', () => {
      component.dataService.isRateLimitReached = true;
      component.dataService.isLoadingResults = false;
      component.dataService.noRecords = false
      fixture.detectChanges()
      const limit = compiled.querySelector(selectors.limit)
      expect(limit).toBeTruthy();
    });
    it('should have a limit text which matches "GitHub\'s API rate limit has been reached. It will be reset in one minute."', () => {
      component.dataService.isRateLimitReached = true;
      component.dataService.isLoadingResults = false;
      component.dataService.noRecords = false
      fixture.detectChanges()
      const limit = compiled.querySelector(selectors.limit)
      expect(limit?.textContent?.trim()).toEqual('GitHub\'s API rate limit has been reached. It will be reset in one minute.');
    });
    it('should have a limit text which matches "No records Available"', () => {
      component.dataService.isRateLimitReached = false;
      component.dataService.isLoadingResults = false;
      component.dataService.noRecords = true
      fixture.detectChanges()
      const noRecord = compiled.querySelector(selectors.noRecord)
      expect(noRecord?.textContent?.trim()).toEqual('No records Available');
    });

    it('should have a paginator', () => {
      const paginator = compiled.querySelector(selectors.paginator);
      expect(paginator).toBeTruthy()
    });

    it('should have a paginator', () => {
      const paginator = compiled.querySelector(selectors.paginator);
      expect(paginator).toBeTruthy()
    });

    it('should have a paginator which has length = totalRecords', () => {
      component.totalRecords = 1000;
      fixture.detectChanges()
      const paginatorLength = compiled.querySelector(selectors.paginator)?.getAttribute('ng-reflect-length')

      expect(paginatorLength).toEqual('1000')
    });

    it('should have a paginator which has pageSize', () => {
      const paginatorLength = compiled.querySelector(selectors.paginator)?.getAttribute('ng-reflect-page-size')
      expect(paginatorLength).toEqual(Page.defaultSize.toString())
    });

  })

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have default value for displayedColumns.length = 3 ', () => {
      expect(component.displayedColumns.length).toEqual(3);
    });
    it('should have default value for displayedColumns = [\'avatar_url\', \'login\', \'type\'] ', () => {
      expect(component.displayedColumns).toEqual(['avatar_url', 'login', 'type']);
    });
    it('should have  value for displayedColumns.length = 4 when dataService.isShowAvatarImage is truthy ', () => {
      component.dataService.isShowAvatarImage.next(true)
      expect(component.displayedColumns.length).toEqual(4);
    });
    it('should have default value for displayedColumns = [\'avatar\', \'avatar_url\', \'login\', \'type\']', () => {
      component.dataService.isShowAvatarImage.next(true)
      expect(component.displayedColumns).toEqual(['avatar', 'avatar_url', 'login', 'type']);
    });
    it('should have  value for dataSource.data = [] ', () => {
      expect(component.dataSource.data).toEqual([]);
    });
    it('should have  value for totalRecords = 0 ', () => {
      expect(component.totalRecords).toEqual(0);
    });
    it('should have  value for pageSize = Page.defaultSize ', () => {
      expect(component.pageSize).toEqual(Page.defaultSize);
    });
    it('should call ngAfterViewInit when component renders', () => {
      const spy = spyOn(component, 'ngAfterViewInit')
      component.ngAfterViewInit();
      expect(spy).toHaveBeenCalled();
    });
    it('should call subscribeToItemsArray after ngAfterViewInit', () => {
      const spy = spyOn(component, 'subscribeToItemsArray')
      component.ngAfterViewInit();
      expect(spy).toHaveBeenCalled();
    });
    it('should have method subscribeToItemsArray which sets the value of displayed columns correctly', () => {
      component.ngAfterViewInit();
      component.dataService.isShowAvatarImage.next(false)
      expect(component.displayedColumns).toEqual(['avatar_url', 'login', 'type']);
      component.dataService.isShowAvatarImage.next(true)
      expect(component.displayedColumns).toEqual(['avatar', 'avatar_url', 'login', 'type']);
    });
    it('should have method pageChange which calls this.dataService.search', () => {
      const spy = spyOn(component.dataService, 'search')
      component.pageChange({pageIndex: 10} as PageEvent)
      expect(spy).toHaveBeenCalledWith(component.dataService.currentSearch, 10)
    });
    it('should have method sortData which calls this.dataService.search', () => {
      const spy = spyOn(component.dataService, 'search')
      component.sortData({active: Sort.login, direction: Order.asc})
      expect(spy).toHaveBeenCalledWith(component.dataService.currentSearch, component.dataService.currentPage, Sort.login, Order.asc)
    });
  })


});
