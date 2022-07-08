import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataItem, ErrorResponse, SuccessResponse} from "@interfaces/*";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {BehaviorSubject, Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Order, Sort} from "@enums/*";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class DataService {

  items$: BehaviorSubject<DataItem[]> = new BehaviorSubject<DataItem[]>([])
  totalCount: number = 0;
  currentPage: number = 0
  currentSearch: string = ''
  currentSort: Sort = Sort.login
  currentOrder: Order = Order.asc
  isRateLimitReached: boolean = false;
  isLoadingResults: boolean = false;
  noRecords: boolean = true;
  isShowAvatarImage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  BASE_URL = 'https://api.github.com/search'

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  }


  public search(value: string = this.currentSearch, page: number = 0, sort: Sort = Sort.login, order: Order = Order.asc) {
    this.isLoadingResults = true;
    this.items$.next([])
    this.getLogin(value, page, sort, order)
      .pipe(untilDestroyed(this)).subscribe((data) => {

      if ("items" in data) {
        this.items$.next(data.items);
      }
      if ("total_count" in data) {
        this.totalCount = data.total_count;
      }
      this.currentPage = page;
      this.currentSort = sort;
      this.currentOrder = order;

      if ("total_count" in data && data.total_count === 0) {
        this.openSnackBar(`No Record Found Text '${value}' Try Another Value`, 'ERROR');
        this.noRecords = true;
        return;
      }

      this.noRecords = false;


      if ("total_count" in data) {
        this.openSnackBar(`Fetched ${data.total_count} Records For Text '${value}' Currently On Page '${page}' Sorted By '${sort}' in '${order}' order`, 'SUCCESS');
      }

    }, () => {
    }, () => {
      this.isLoadingResults = false;
    })
  }

  public getLogin(value: string = '', page: number = 0, sort: string = Sort.login, order: string = Order.asc): Observable<SuccessResponse | ErrorResponse> {
    return this.http.get<SuccessResponse | ErrorResponse>(`${this.BASE_URL}/users?q=${value} in:login`, {
      params: {
        page: page,
        per_page: 9,
        sort: sort,
        order: order
      },
    })
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action)._dismissAfter(2000)
  }
}
