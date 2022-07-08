import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ResultsComponent, SearchComponent} from '@components/*';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HeaderComponent} from '@components/header';
import {SearchWithToggleComponent} from '@components/search-with-toggle';
import {Route, RouterModule} from "@angular/router";
import {PageNotFoundComponent} from '@components/page-not-found';
import {MainComponent} from '@components/main';
import {ErrorInterceptor} from "@interceptors/*";

const routes: Route[] = [{component: MainComponent, path: '',}, {path: '**', component: PageNotFoundComponent}]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultsComponent,
    HeaderComponent,
    SearchWithToggleComponent,
    PageNotFoundComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent], providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]

})
export class AppModule {
}

