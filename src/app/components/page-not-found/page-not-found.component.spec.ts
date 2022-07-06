import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageNotFoundComponent} from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
