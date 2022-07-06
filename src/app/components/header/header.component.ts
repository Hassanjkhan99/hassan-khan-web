import {Component, Input, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DataService, ThemeService} from "@service/*";


@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isDark: boolean = false;
  @Input() isMainHeader: boolean = true;


  constructor(private _dataService: DataService, private _themeService: ThemeService) {
  }

  ngOnInit(): void {
    this._themeService.isThemeDark.pipe(untilDestroyed(this)).subscribe(value => {
      this.isDark = value;
    })
  }

  toggleChanged($event: boolean) {
    this._dataService.isShowAvatarImage.next($event)
  }

  changeTheme() {
    this._themeService.isThemeDark.next(!this._themeService.isThemeDark.value)
  }
}


