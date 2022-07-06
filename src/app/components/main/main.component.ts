import {Component, OnInit} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import {DialogueService} from "@service/*";

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public dialogueService: DialogueService) {
  }

  ngOnInit(): void {
    this.dialogueService.open()
  }

}
