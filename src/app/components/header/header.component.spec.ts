import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from '@components/*';
import {dataCySelector} from "@helpers/*";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AppModule} from "../../app.module";

const selectors = {
  header: dataCySelector('header__main'),
  iconContainer: dataCySelector('header__icon-container'),
  icon: dataCySelector('header__icon'),
  toggle: dataCySelector('header__toggle'),
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [AppModule],
      providers: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Template', () => {
    it('should render full header if isMainHeader is truthy', () => {
      component.isMainHeader = true;
      fixture.detectChanges()
      const headerChild = compiled.querySelector(selectors?.header)?.querySelector('.header__child');

      expect(headerChild).toBeTruthy()
    });

    it('should not render full header if isMainHeader is falsy', () => {
      component.isMainHeader = false
      fixture.detectChanges()
      const headerChild = compiled.querySelector(selectors?.header)?.querySelector('.header__child');

      expect(headerChild).toBeFalsy()
    });

    it('should render small header if isMainHeader is falsy', () => {
      component.isMainHeader = false;
      fixture.detectChanges()
      const headerChild = compiled.querySelector(selectors?.header)?.querySelector('.header__child');

      expect(headerChild).toBeFalsy()
    });

    it('should not render min header if isMainHeader is truthy', () => {
      component.isMainHeader = true
      fixture.detectChanges()
      const headerChild = compiled.querySelector(selectors?.header)?.querySelector('.header__child');

      expect(headerChild).toBeTruthy()
    });

    it('should call changeTheme() when icon container is clicked', () => {
      const spy = spyOn(component, 'changeTheme')
      const iconContainer = compiled.querySelector(selectors.iconContainer) as HTMLElement
      iconContainer.click()
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled()
    });


    it('should show icon timelapse when isDark is true', () => {
      const icon = compiled.querySelector(selectors.icon) as HTMLElement;
      component.isDark = true;
      fixture.detectChanges()

      expect(icon.textContent?.trim()).toEqual('timelapse');
    });

    it('should show icon wb_sunny when isDark is false', () => {
      const icon = compiled.querySelector(selectors.icon) as HTMLElement;
      component.isDark = false;
      fixture.detectChanges()

      expect(icon.textContent?.trim()).toEqual('wb_sunny');
    });

    it('should not display toggle when isMainHeader is true', () => {
      component.isMainHeader = true
      fixture.detectChanges()
      const toggle = compiled.querySelector(selectors.toggle) as HTMLElement

      expect(toggle).toBeTruthy()
    });


  })

  describe('Component', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('isDark start value should be false ', () => {
      expect(component.isDark).toBeFalsy()
    });

    it('isMainHeader start value should be true ', () => {
      expect(component.isMainHeader).toBeTruthy()
    });

    it('should call ngOnInit on render', () => {
      const spy = spyOn(component, 'ngOnInit')

      component.ngOnInit()
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled()
    });
    it('should set value of isDark according to themeService', () => {
      component.ngOnInit()
      fixture.detectChanges();
      // @ts-expect-error
      component._themeService.isThemeDark.next(true)
      expect(component.isDark).toBeTruthy()

      // @ts-expect-error
      component._themeService.isThemeDark.next(false)
      expect(component.isDark).toBeFalsy()
    });

    it('toggleChange() should set value in dataService.isShowAvatarImage', () => {
      component.toggleChanged(true)
      // @ts-expect-error
      expect(component._dataService.isShowAvatarImage.value).toBeTruthy()

      component.toggleChanged(false)
      // @ts-expect-error
      expect(component._dataService.isShowAvatarImage.value).toBeFalsy()
    });

    it('changeTheme() should set value in themeService.isThemeDark', () => {
      // @ts-expect-error
      let currentValue = component._themeService.isThemeDark.value
      component.changeTheme()
      // @ts-expect-error
      expect(component._themeService.isThemeDark.value).toEqual(!currentValue);

      // @ts-expect-error
      currentValue = component._themeService.isThemeDark.value
      component.changeTheme()
      // @ts-expect-error
      expect(component._themeService.isThemeDark.value).toEqual(!currentValue);
    });

  })

});
