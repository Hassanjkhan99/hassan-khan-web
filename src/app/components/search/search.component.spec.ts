import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from '@components/*';
import {dataCySelector} from "@helpers/*";
import {AppModule} from "../../app.module";

const selectors = {
  container: dataCySelector('search__container'),
  containerChild: dataCySelector('search__container-child'),
  field: dataCySelector('search__field'),
  label: dataCySelector('search__label'),
  input: dataCySelector('search__input'),
  error: dataCySelector('search__error'),
  button: dataCySelector('search__button'),
}
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [AppModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement
    fixture.detectChanges();
  });

  describe('Template', () => {
    it('should have a search container div with classes search-container center pb-2', () => {
      const ele = compiled.querySelector(selectors.container);
      expect(ele).toBeTruthy();
      expect(ele).toHaveClass('search-container')
      expect(ele).toHaveClass('center')
      expect(ele).toHaveClass('pb-2')
    });
    it('should have a search container child div with class center__column', () => {
      const ele = compiled.querySelector(selectors.container)?.querySelector(selectors.containerChild)
      expect(ele).toBeTruthy();
      expect(ele).toHaveClass('center__column')

    });
    it('should have a search container child div with 2 children', () => {
      const eleChildren = compiled.querySelector(selectors.containerChild)?.childNodes
      expect(eleChildren?.length).toEqual(2)

    });
    it('should have a mat form field with attribute appearance="outline"', () => {
      const field = compiled.querySelector(selectors.field)
      expect(field).toBeTruthy();
      expect(field?.getAttribute('appearance')).toEqual('outline')
    });

    it('should have a mat form field with children label,input', () => {
      const field = compiled.querySelector(selectors.field)
      expect(field?.querySelector(selectors.label)).toBeTruthy();
      expect(field?.querySelector(selectors.input)).toBeTruthy();
    });
    it('should have a label with text="Enter any text"', () => {
      const label = compiled.querySelector(selectors.label)
      expect(label).toBeTruthy();
      expect(label?.textContent?.trim()).toContain('Enter any text');
    });
    it('should have a input with attributes  matInput required placeholder="foo"', () => {
      const input = compiled.querySelector(selectors.input) as HTMLInputElement
      expect(input).toBeTruthy();
      expect(input?.placeholder?.trim()).toEqual('foo')
      expect(input?.getAttributeNames()).toContain('matinput');
      expect(input?.getAttributeNames()).toContain('required');
    });

    it('should have a button with text search and disabled when searchValue = ""', () => {
      const button = compiled.querySelector(selectors.button)
      expect(button).toBeTruthy();
      expect(button?.textContent?.trim()).toEqual('Search')
      expect(button?.getAttribute('disabled')).toEqual('true')
    });
    it('should have a button with attributes  mat-raised-button color="primary"', () => {
      const button = compiled.querySelector(selectors.button)
      expect(button?.getAttributeNames()).toContain('mat-raised-button')
      expect(button?.getAttribute('color')).toEqual('primary')
    });
  })

  describe('Component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a search() which calls _dataService.search with search value', () => {
      component.dataService.currentSearch = 'foo'
      fixture.detectChanges();
      const spy = spyOn(component.dataService, 'search')
      component.search()
      expect(spy).toHaveBeenCalled()
    });
    it('should have a search() which calls _dialogueService.close() ', () => {
      const spy = spyOn(component.dialogueService, 'close')
      component.search()
      expect(spy).toHaveBeenCalled();
    });
  })


});
