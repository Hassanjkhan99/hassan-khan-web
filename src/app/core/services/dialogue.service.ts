import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SearchWithToggleComponent} from "@components/*";

@Injectable({
  providedIn: 'root'
})
export class DialogueService {
  isOpen: boolean = false
  private _dialogueRef!: MatDialogRef<SearchWithToggleComponent>;

  constructor(private _dialog: MatDialog) {
  }

  open() {
    this._dialogueRef = this._dialog.open(SearchWithToggleComponent, {
      width: '25vw',
      height: '25vw',
      disableClose: true
    })
    this.isOpen = true
  }

  close() {
    if (this.isOpen) {
      this._dialogueRef.close()
      this.isOpen = false
    }
  }
}
