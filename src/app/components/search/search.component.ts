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


  constructor(public dataService: DataService, public dialogueService: DialogueService) {
  }


  search() {
    this.dataService.search();
    this.dialogueService.close()
  }
}
