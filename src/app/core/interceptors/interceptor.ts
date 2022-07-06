import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, mergeMap, retryWhen} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataService} from "@service/*";

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar, private _dataService: DataService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retryWhen((error) => {
          return error.pipe(
            mergeMap((error, index) => {
              if (index < maxRetries) {
                let action = 'ERROR'
                this._dataService.noRecords = true;
                this._dataService.isLoadingResults = false
                switch (error.status) {
                  case HttpStatusCode.InternalServerError:
                    this.openSnackBar('Server down sending request again in 2 second(s)', action)
                    of(error).pipe(delay(delayMs));
                    break;
                  case HttpStatusCode.Forbidden:
                    this._dataService.isRateLimitReached = true;
                    this._dataService.isLoadingResults = false;
                    this._dataService.noRecords = false
                    this.openSnackBar('API rate limit exceeded', action)
                    setTimeout(() => {
                      this._dataService.isRateLimitReached = false
                      this._dataService.noRecords = true
                    }, 60000)
                    break;
                  default:
                    this.openSnackBar('An error occurred', action)
                    break;
                }
              }
              throw error;
            })
          )
        }
      )
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)._dismissAfter(2000)
  }
}
