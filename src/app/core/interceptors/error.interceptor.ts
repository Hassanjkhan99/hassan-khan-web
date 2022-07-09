import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataService} from "@service/*";
import {delay, mergeMap, retryWhen} from "rxjs/operators";
import {Action, SnackBarMessagesErrors} from "@enums/*";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public _maxRetries: number = 2;
  public _delayMs: number = 2000;

  constructor(public snackBar: MatSnackBar, public dataService: DataService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen((error$) => {
          return error$
            .pipe(
              mergeMap((error, index) => {
                this.errorFn(index, error);
                throw error;
              })
            )
        }
      )
    )
  }

  openSnackBar(message: string, action: string) {
    const snackBar = this.snackBar.open(message, action);
    setTimeout(() => {
      snackBar.dismiss()
    }, 2000)
  }

  errorFn(index: number, error: HttpErrorResponse) {
    if (index < this._maxRetries) {
      this.dataService.noRecords = true;
      this.dataService.isLoadingResults = false
      this.applySwitch(error)
    }
  }

  applySwitch(error: HttpErrorResponse) {
    let action = Action.Error

    switch (error.status) {
      case HttpStatusCode.InternalServerError:
        this.openSnackBar(SnackBarMessagesErrors.InternalServerError, action)
        of(error).pipe(delay(this._delayMs));
        break;
      case HttpStatusCode.Forbidden:
        this.dataService.isRateLimitReached = true;
        this.dataService.isLoadingResults = false;
        this.dataService.noRecords = false
        this.openSnackBar(SnackBarMessagesErrors.Forbidden, action)
        setTimeout(() => {
          this.dataService.isRateLimitReached = false
          this.dataService.noRecords = true
        }, 60000)
        break;
      default:
        this.openSnackBar(SnackBarMessagesErrors.Default, action)
        break;
    }

  }
}
