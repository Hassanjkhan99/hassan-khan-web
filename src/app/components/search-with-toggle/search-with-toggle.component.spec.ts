import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchWithToggleComponent} from '@components/*';
import {AppModule} from "../../app.module";
import {dataCySelector} from "@helpers/*";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

const selectors = {
  container: dataCySelector('search-toggle__container'),
  header: dataCySelector('search-toggle__header'),
  search: dataCySelector('search-toggle__search'),
}

describe('SearchWithToggleComponent', () => {
  let component: SearchWithToggleComponent;
  let fixture: ComponentFixture<SearchWithToggleComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchWithToggleComponent],
      imports: [AppModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchWithToggleComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement
    fixture.detectChanges();
  });


  describe('Template', () => {

    it('should render div container with class column__center', () => {
      const container = compiled.querySelector(selectors.container);
      expect(container).toBeTruthy();
      expect(container).toHaveClass('column__center')
    });
    it('should render div container with 2 children', () => {
      const container = compiled.querySelector(selectors.container);
      expect(container?.childNodes.length).toEqual(2)
    });
    it('should render div container with child app-header and app-search', () => {
      const container = compiled.querySelector(selectors.container);
      const header = container?.querySelector(selectors.header)
      const search = container?.querySelector(selectors.search)
      expect(header).toBeTruthy()
      expect(search).toBeTruthy()
    });
    it('should render app-header with attribute [isMainHeader]=\'false\'', () => {
      const header = compiled.querySelector(selectors.header)
      expect(header?.getAttribute('ng-reflect-is-main-header')).toEqual('false')
    });

  })
  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have isDark with initial value false', () => {
      expect(component.isDark).toBeFalsy();
    });
    it('should set isDark value according to themeService after ngOninit', () => {
      component.ngOnInit();
      //@ts-expect-error
      component._themeService.isThemeDark$.next(true);
      expect(component.isDark).toBeTruthy();
      //@ts-expect-error
      component._themeService.isThemeDark$.next(false);
      expect(component.isDark).toBeFalsy();
    });
    it('should have toggleChanged which changes value in _dataService.isShowAvatarImage', () => {
      component.toggleChanged({checked: true} as MatSlideToggleChange);
      //@ts-expect-error
      expect(component._dataService.isShowAvatarImage.value).toBeTruthy();
      component.toggleChanged({checked: false} as MatSlideToggleChange);
      //@ts-expect-error
      expect(component._dataService.isShowAvatarImage.value).toBeFalsy();
    });
    it('should have changeTheme() which inverts value in _themeService.isThemeDark', () => {
      debugger;
      //@ts-expect-error
      component._themeService.isThemeDark$.next(true)
      //@ts-expect-error
      const currentValue = component._themeService.isThemeDark$.value
      component.changeTheme();
      fixture.detectChanges()
      //@ts-expect-error
      expect(component._dataService.isShowAvatarImage.value).toEqual(!currentValue);
    });
  })
});
