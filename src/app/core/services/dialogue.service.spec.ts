import {TestBed} from '@angular/core/testing';

import {DialogueService} from './dialogue.service';
import {AppModule} from "../../app.module";
import {SearchWithToggleComponent} from "@components/*";

describe('DialogueService', () => {
  let service: DialogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    });
    service = TestBed.inject(DialogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be have isOpen with initial value false', () => {
    expect(service.isOpen).toBeFalsy();
  });
  it('should be have open() which triggers ._dialog.open() with params and set this.isOpen = true', () => {

    const spy = spyOn(service._dialog, 'open')
    service.open()
    expect(spy).toHaveBeenCalledWith(SearchWithToggleComponent, {
      disableClose: true
    });
    expect(service.isOpen).toBeTruthy();
  });

  it('should be have close() which if isOpen is truthy sets it to false dialogueRef.close() else do nothing', () => {
    service.open();

    const spy = spyOn(service.dialogueRef, 'close')
    service.close();
    expect(spy).toHaveBeenCalled();
    expect(service.isOpen).toBeFalsy();
  });
});
