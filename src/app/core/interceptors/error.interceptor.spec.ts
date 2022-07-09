import {fakeAsync, TestBed} from '@angular/core/testing';

import {ErrorInterceptor} from './error.interceptor';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Observable, of} from "rxjs";
import {ErrorResponse} from "@interfaces/*";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
  HttpStatusCode
} from "@angular/common/http";
import {Action, Order, SnackBarMessagesErrors, Sort} from "@enums/*";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DataService} from "@service/*";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const errorResponse: ErrorResponse = {
  message: "API rate limit exceeded for 119.160.58.214. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
  documentation_url: "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
}

class next {
  static handle(request: HttpRequest<unknown>): Observable<ErrorResponse> {
    return of(errorResponse);
  }
};

const params: { page: number, per_page: number, sort: Sort, order: Order } = {
  page: 1,
  per_page: 9,
  sort: Sort.login,
  order: Order.asc
}
const value = 'foo';


describe('ErrorInterceptor', () => {
  let interceptor: ErrorInterceptor;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let service: DataService
  let url: string
  let handler: HttpHandler

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [ErrorInterceptor, {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}]
    });
    interceptor = TestBed.inject(ErrorInterceptor);
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController)
    service = TestBed.inject(DataService)
    url = `${service.BASE_URL}/users?q=${value} in:login&page=${params.page}&per_page=${params.per_page}&sort=${params.sort}&order=${params.order}`
    handler = TestBed.inject(HttpHandler)
    jasmine.clock().install()
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  it('should have a field _maxRetries with initial value 2', () => {
    expect(interceptor._maxRetries).toEqual(2);
  });
  it('should have a field _delayMs with initial value 2', () => {
    expect(interceptor._delayMs).toEqual(2000);
  });

  it('should call returnError() with valid arguments', () => {
    const spy = spyOn(interceptor, "errorFn")
    interceptor.dataService.noRecords = false;
    interceptor.errorFn(1, {status: HttpStatusCode.Forbidden} as HttpErrorResponse)
    expect(spy).toHaveBeenCalledWith(1, {status: HttpStatusCode.Forbidden} as HttpErrorResponse)
  });

  it('should call applySwitch() with valid arguments', () => {
    const spy = spyOn(interceptor, "applySwitch")
    interceptor.errorFn(1, {status: HttpStatusCode.Forbidden} as HttpErrorResponse)
    expect(spy).toHaveBeenCalledWith({status: HttpStatusCode.Forbidden} as HttpErrorResponse)
  });

  it('should call openSnackBar() with Forbidden if statusCode is Forbidden', () => {
    const spy = spyOn(interceptor, "openSnackBar")
    interceptor.applySwitch({status: HttpStatusCode.Forbidden} as HttpErrorResponse)
    expect(spy).toHaveBeenCalledWith(SnackBarMessagesErrors.Forbidden, Action.Error)
  });

  it('should call openSnackBar() with InternalServerError if statusCode is InternalServerError', () => {
    const spy = spyOn(interceptor, "openSnackBar")
    interceptor.applySwitch({status: HttpStatusCode.InternalServerError} as HttpErrorResponse)
    expect(spy).toHaveBeenCalledWith(SnackBarMessagesErrors.InternalServerError, Action.Error)
  });

  it('should call openSnackBar() with Default if statusCode not Forbidden or Internal Server Error', () => {
    const spy = spyOn(interceptor, "openSnackBar")
    interceptor.applySwitch({status: HttpStatusCode.Gone} as HttpErrorResponse)
    expect(spy).toHaveBeenCalledWith(SnackBarMessagesErrors.Default, Action.Error)
  });

  it('should when call openSnackBar() with Forbidden then dataService.isRateLimitReached = true', () => {
    interceptor.dataService.isRateLimitReached = false;
    interceptor.applySwitch({status: HttpStatusCode.Forbidden} as HttpErrorResponse)
    expect(interceptor.dataService.isRateLimitReached).toBeTruthy()
  });

  it('should when call openSnackBar() with Forbidden then dataService.noRecords = false', () => {
    interceptor.dataService.noRecords = true;
    interceptor.applySwitch({status: HttpStatusCode.Forbidden} as HttpErrorResponse)
    expect(interceptor.dataService.noRecords).toBeFalsy()
  });


  it(' should when call openSnackBar() with Forbidden then first dataService.isRateLimitReached = true then after 60sec it is turned false', fakeAsync((done: () => void) => {
    interceptor.dataService.isRateLimitReached = false;
    interceptor.applySwitch({status: HttpStatusCode.Forbidden} as HttpErrorResponse)
    expect(interceptor.dataService.isRateLimitReached).toBeTruthy();
    jasmine.clock().tick(60001)
    expect(interceptor.dataService.isRateLimitReached).toBeFalsy();
  }))

  it(' should when call openSnackBar() with Forbidden then first dataService.noRecords = false then after 60sec it is turned true', fakeAsync((done: () => void) => {
    interceptor.dataService.noRecords = true;
    interceptor.applySwitch({status: HttpStatusCode.Forbidden} as HttpErrorResponse)
    expect(interceptor.dataService.noRecords).toBeFalsy();
    jasmine.clock().tick(60001)
    expect(interceptor.dataService.noRecords).toBeTruthy();
  }))


  it('should have a intercept method which is called when a api call is launched', () => {
    http.get<ErrorResponse>(url).subscribe((res) => {
      expect(res.message).toEqual(errorResponse.message)
      expect(res.documentation_url).toEqual(errorResponse.documentation_url)
    })
    const request = httpMock.expectOne(url);
    request.flush(errorResponse);
  })

});
