import {Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {DataService, ThemeService} from '@service/*';

@UntilDestroy()
@Component({
  selector: 'app-search-with-toggle',
  templateUrl: './search-with-toggle.component.html',
  styleUrls: ['./search-with-toggle.component.scss']
})
export class SearchWithToggleComponent implements OnInit {

  isDark: boolean = false;


  constructor(public dataService: DataService, public themeService: ThemeService) {

  }

  ngOnInit(): void {
    this.themeService.isThemeDark$.pipe(untilDestroyed(this)).subscribe(value => {
      this.isDark = value;
    })

  }

  toggleChanged($event: MatSlideToggleChange) {
    this.dataService.isShowAvatarImage.next($event.checked)
  }

  changeTheme() {
    this.themeService.isThemeDark$.next(!this.themeService.isThemeDark$.value)
  }

}
