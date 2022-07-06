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


  constructor(private _dataService: DataService, private _themeService: ThemeService) {

  }

  ngOnInit(): void {
    this._themeService.isThemeDark.pipe(untilDestroyed(this)).subscribe(value => {
      this.isDark = value;
    })

  }

  toggleChanged($event: MatSlideToggleChange) {
    this._dataService.isShowAvatarImage.next($event.checked)
  }

  changeTheme() {
    this._themeService.isThemeDark.next(!this._themeService.isThemeDark.value)
  }

}
