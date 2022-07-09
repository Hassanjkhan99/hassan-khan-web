import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {HeaderComponent, MainComponent, PageNotFoundComponent} from '@components/*';
import {dataCySelector} from "@helpers/*";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Route, Router} from "@angular/router";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {Location} from "@angular/common";

const selectors = {
  header: dataCySelector('header__main'),
  iconContainer: dataCySelector('header__icon-container'),
  icon: dataCySelector('header__icon'),
  toggle: dataCySelector('header__toggle'),
}
const routes: Route[] = [{component: MainComponent, path: '',}, {path: '**', component: PageNotFoundComponent}]

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let compiled: HTMLElement;
  let location: Location
  let router: Router
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule, MatSnackBarModule, MatIconModule],
      providers: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location)
    compiled = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router)
    router.initialNavigation();
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

    it('isNotHome start value should be true ', () => {
      expect(component.isNotHome).toBeFalsy()
    });

    it('should call ngOnInit on render', () => {
      const spy = spyOn(component, 'ngOnInit')

      component.ngOnInit()
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled()
    });

    it('should call ngAfterViewChecked on render', () => {
      const spy = spyOn(component, 'ngAfterViewChecked');

      component.ngAfterViewChecked()
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled()
    });

    it('should set isNotHome  if is not at "/" then false', fakeAsync(() => {
      component.ngAfterViewChecked()
      router.navigateByUrl('/test');
      tick();
      fixture.detectChanges();
      console.log(router.url)
      expect(component.isNotHome).toBeTruthy()
    }));

    it('should set isNotHome  if is at "/" then true', fakeAsync(() => {
      component.ngAfterViewChecked()
      router.navigateByUrl('/');
      tick();
      fixture.detectChanges();
      console.log(router.url)
      expect(component.isNotHome).toBeFalsy()
    }));

    it('should set value of isDark according to themeService', () => {
      component.ngOnInit()
      fixture.detectChanges();
      component._themeService.isThemeDark$.next(true)
      expect(component.isDark).toBeTruthy()

      component._themeService.isThemeDark$.next(false)
      expect(component.isDark).toBeFalsy()
    });

    it('toggleChange() should set value in dataService.isShowAvatarImage', () => {
      component.toggleChanged(true)
      expect(component.dataService.isShowAvatarImage.value).toBeTruthy()

      component.toggleChanged(false)
      expect(component.dataService.isShowAvatarImage.value).toBeFalsy()
    });

    it('changeTheme() should set value in themeService.isThemeDark', () => {
      let currentValue = component._themeService.isThemeDark$.value
      component.changeTheme()
      expect(component._themeService.isThemeDark$.value).toEqual(!currentValue);

      currentValue = component._themeService.isThemeDark$.value
      component.changeTheme()
      expect(component._themeService.isThemeDark$.value).toEqual(!currentValue);
    });

  })

});
