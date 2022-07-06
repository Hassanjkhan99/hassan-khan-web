import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MainComponent} from '@components/*';
import {dataCySelector} from "@helpers/*";
import {DialogueService} from "@service/*";
import {AppModule} from "../../app.module";


const selectors = {
  main: dataCySelector('main__main'),
  search: dataCySelector('main__search'),
  results: dataCySelector('main__results'),
}
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [AppModule],
      providers: [DialogueService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });
  describe('Template', () => {

    it('should render main div', () => {
      expect(compiled.querySelector(selectors.main)).toBeTruthy()
    });

    it('should render app-search', () => {
      expect(compiled.querySelector(selectors.search)).toBeTruthy()
    });

    it('should render app-results', () => {
      expect(compiled.querySelector(selectors.results)).toBeTruthy()
    });

  })
  describe('Component', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should call open() in dialogue service after ngOnInit ', () => {
      const spy = spyOn(component.dialogueService, 'open')

      component.ngOnInit()
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });
  });

});
