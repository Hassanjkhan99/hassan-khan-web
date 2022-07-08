import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppModule} from "./app.module";
import {DialogueService} from "@service/*";
import {dataCySelector} from "@helpers/*";

const selectors = {
  root: dataCySelector('app__root'),
  header: dataCySelector('app__header'),
}
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [AppModule],
      providers: [DialogueService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  describe('Template', () => {


    it('should render app-root div', () => {
      expect(compiled.querySelector(selectors.root)).toBeTruthy()
    });

    it('should apply class "bg-dark" when isDark is truthy on app-root div', () => {
      component.ngOnInit()
      fixture.detectChanges();
      component.isDark = true
      fixture.detectChanges();

      expect(compiled.querySelector(selectors.root)).toHaveClass('bg-dark')
    });

    it('should not apply class "bg-dark" when isDark is falsy on app-root div', () => {
      component.ngOnInit()
      fixture.detectChanges();
      //to ensure isDark is falsy
      component.isDark = false
      fixture.detectChanges();

      expect(compiled.querySelector(selectors.root)).not.toHaveClass('bg-dark')
    });


    it('should render app-header', () => {
      expect(compiled.querySelector(selectors.header)).toBeTruthy()
    });

  })
  describe('Component', () => {

    it('className start value should be ""', () => {

      expect(component.className).toEqual("");
    });

    it('darkClassName  value should be "darkMode"', () => {
      expect(component.darkClassName).toEqual("darkMode");
    });

    it('_isDark start value should be false', () => {

      // @ts-expect-error
      expect(component._isDark).toEqual(false);
    });

    it('getter isDark must return same value _isDark', () => {

      // @ts-expect-error
      component._isDark = true;
      fixture.detectChanges();


      // @ts-expect-error
      expect(component.isDark).toEqual(component._isDark);
    });

    it('setter isDark must set correct value in _isDark', () => {

      component.isDark = true
      fixture.detectChanges();

      // @ts-expect-error
      expect(component._isDark).toEqual(component.isDark);
    });

    it('should call ngOnInit on render', () => {
      const spy = spyOn(component, 'ngOnInit')

      component.ngOnInit()
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled()
    });


    it('should call changeTheme() in theme service after ngOnInit ', () => {
      const spy = spyOn(component, 'changeTheme')

      component.ngOnInit()
      component.themeService.isThemeDark$.next(true)
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(true);
    });

    it('themeChange Should set values of  classList and isDark correctly', () => {

      component.ngOnInit();
      component.changeTheme(true);
      fixture.detectChanges();

      expect(component.isDark).toEqual(true);
      expect(component.className).toEqual(component.darkClassName);
      // @ts-expect-error
      expect(component._overlay.getContainerElement().classList).toContain(component.darkClassName)
    })
  })
})

