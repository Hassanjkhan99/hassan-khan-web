import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SearchWithToggleComponent} from "@components/*";

@Injectable({
  providedIn: 'root'
})
export class DialogueService {
  isOpen: boolean = false
  public dialogueRef!: MatDialogRef<SearchWithToggleComponent>;

  constructor(public _dialog: MatDialog) {
  }

  open() {
    this.dialogueRef = this._dialog.open(SearchWithToggleComponent, {
      disableClose: true
    })
    this.isOpen = true
  }

  close() {
    if (this.isOpen) {
      this.dialogueRef.close()
      this.isOpen = false
    }
  }


}
