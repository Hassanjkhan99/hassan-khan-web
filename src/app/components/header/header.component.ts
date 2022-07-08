import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {DataService, ThemeService} from "@service/*";
import {Router} from "@angular/router";


@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
  isDark: boolean = false;
  @Input() isMainHeader: boolean = true;
  isHome: boolean = false;

  constructor(private _dataService: DataService, private _themeService: ThemeService, public router: Router) {
  }

  ngOnInit(): void {
    this._themeService.isThemeDark$.pipe(untilDestroyed(this)).subscribe(value => {
      this.isDark = value;
    })
  }

  toggleChanged($event: boolean) {
    this._dataService.isShowAvatarImage.next($event)
  }

  changeTheme() {
    this._themeService.isThemeDark$.next(!this._themeService.isThemeDark$.value)
  }


  ngAfterViewChecked(): void {
    this.router.events.subscribe((e) => {
      this.isHome = this.router.url !== '/'
    })


  }
}


