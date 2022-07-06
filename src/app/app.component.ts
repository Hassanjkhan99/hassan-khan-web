import {Component, HostBinding} from '@angular/core';
import {UntilDestroy, untilDestroyed,} from "@ngneat/until-destroy";
import {DialogueService, ThemeService} from "@service/*";
import {OverlayContainer} from "@angular/cdk/overlay";


@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hassan-khan-web';

  @HostBinding('class') className = '';
  darkClassName = 'darkMode';

  constructor(public dialogueService: DialogueService, private _overlay: OverlayContainer, public themeService: ThemeService) {
  }

  private _isDark: boolean = false;

  public get isDark() {
    return this._isDark;
  }

  public set isDark(value: boolean) {
    this._isDark = value
  }

  ngOnInit(): void {
    this.themeService.isThemeDark.pipe(untilDestroyed(this)).subscribe(value => {
      this.changeTheme(value)
    })
  }

  changeTheme($event: boolean) {
    this.isDark = $event
    this.className = $event ? this.darkClassName : ''
    if (this.className === this.darkClassName) {
      this._overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this._overlay.getContainerElement().classList.remove(this.darkClassName);
    }
  }
}
