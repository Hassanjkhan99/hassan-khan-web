import {Component} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import {DataService, DialogueService} from "@service/*";

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchValue: string = '';


  constructor(private _dataService: DataService, private _dialogueService: DialogueService) {
  }


  search() {
    this._dataService.search(this.searchValue);
    this._dialogueService.close()
  }
}
